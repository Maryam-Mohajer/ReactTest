import { AxiosResponse } from 'axios';
import { IAxiosResult } from 'core/models/axios-result.model';
import methods from '../interceptors/http.interceptor';
import { useQueries, useQuery } from 'react-query';

const MaibnUrl = process.env.REACT_APP_SABAK_PATH;

const GetOwnedUserUnionForAdmin = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MaibnUrl}/api/Union/GetOwnedUserUnionForAdmin`);
};

export const useGetOwnedUserUnionForAdmin = () => {
  return useQuery('GetOwnedUserUnionForAdmin', GetOwnedUserUnionForAdmin);
};
