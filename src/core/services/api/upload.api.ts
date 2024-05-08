import methods from "../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const ServeUserPrimaryInfoDocumnetsImage = async (
  fileName: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Serve/ServeUserPrimaryInfoDocumnetsImage?fullFileName=${fileName}`,
    {
      responseType: "blob",
    }
  );
};

const ServeFile = async (
  fileName: string
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(`${MainUrl}/api/Upload/ServeFile?fileName=` + fileName, {
    responseType: "blob",
  });
};

export const useServeUserPrimaryInfoDocumnetsImage = () => {
  return useMutation(ServeUserPrimaryInfoDocumnetsImage, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context);
      tempLink.click();
    },
  });
};

export const useServeShowUserPrimaryInfoDocumnetsImage = () => {
  return useMutation(ServeUserPrimaryInfoDocumnetsImage, {});
};

//ChangeUserProfilePic
const ChangeUserProfilePic = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(`${MainUrl}/api/User/ChangeUserProfilePic`, document, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useChangeUserProfilePic = () => {
  return useMutation(ChangeUserProfilePic, {});
};

export const useServe = () => {
  return useMutation(ServeFile, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context);
      tempLink.click();
    },
  });
};
export const useServeShowFile = () => {
  return useMutation(ServeFile, {});
};