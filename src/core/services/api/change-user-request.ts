import methods from '../interceptors/http.interceptor';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IAxiosResult } from '../../models/axios-result.model';

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const SetChangeUserRequestForOthers = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/ChangeUserRequest/SetChangeUserRequestForOthers`, data);
};

export const useSetChangeUserRequestForOthers = () => {
  return useMutation(SetChangeUserRequestForOthers, {});
};
const GetAllChangeUserRequestsForOthers = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/ChangeUserRequest/GetAllChangeUserRequestsForOthers`, data);
};

export const useGetAllChangeUserRequestsForOthers = () => {
  return useMutation(GetAllChangeUserRequestsForOthers, {});
};
