import methods from '../interceptors/http.interceptor';
import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { IAxiosResult } from '../../models/axios-result.model';

const MainUrl = process.env.REACT_APP_SABAK_PATH;

const SetChangeUserRequestForOthers = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/ChangeUserRequest/SetChangeUserRequestForOthers`, data);
};

const getUserByNationalCode = async (nationalCode: string): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/Account/GetUserByNationalCode?nationalCode=${nationalCode}`);
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
export const useGetUserByNationalCode = () => {
  return useMutation(getUserByNationalCode, {});
};
