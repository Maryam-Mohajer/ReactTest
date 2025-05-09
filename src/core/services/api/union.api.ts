import { AxiosResponse } from 'axios';
import { IAxiosResult } from 'core/models/axios-result.model';
import methods from '../interceptors/http.interceptor';
import { useQuery } from 'react-query';

const MainUrl = process.env.REACT_APP_SABAK_PATH;

const GetOwnedUserUnionForAdmin = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/Union/GetOwnedUserUnionForAdmin`);
};

const GetAllUseTypes = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/Union/GetAllUseTypes`);
};

export const useGetOwnedUserUnionForAdmin = () => {
  return useQuery('GetOwnedUserUnionForAdmin', GetOwnedUserUnionForAdmin, { enabled: false });
};

export const useGetAllUseTypes = () => {
  return useQuery('useGetAllUseTypes', GetAllUseTypes, { enabled: false });
};
