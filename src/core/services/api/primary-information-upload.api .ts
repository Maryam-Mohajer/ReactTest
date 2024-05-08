import methods from "../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const ServeUserPrimaryInfoDocumnetsImage = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Serve/ServeUserPrimaryInfoDocumnetsImage?fullFileName=${file.fullFileName}`,
    {
      responseType: "blob",
    }
  );
};

export const useServeUserPrimaryInfoDocumnetsImage = () => {
  return useMutation(ServeUserPrimaryInfoDocumnetsImage, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fullFileName);
      tempLink.click();
    },
  });
};

export const useShowServeUserPrimaryInfoDocumnetsImage = () => {
  return useMutation(ServeUserPrimaryInfoDocumnetsImage, {});
};

//////////////////////
const ServeGeneralFile = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Serve/ServeGeneralFile?fileName=${file.fileName}`,
    {
      responseType: "blob",
    }
  );
};

export const useServeGeneralFile = () => {
  return useMutation(ServeGeneralFile, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};

export const useShowServeGeneralFile = () => {
  return useMutation(ServeGeneralFile, {});
};
