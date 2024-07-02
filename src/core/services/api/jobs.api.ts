import { AxiosResponse } from 'axios';
import { IAxiosResult } from 'core/models/axios-result.model';
import methods from '../interceptors/http.interceptor';
import { useMutation } from 'react-query';
const MainUrl = process.env.REACT_APP_SABAK_PATH;

const GetAllJobByMultiUseType = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Job/GetAllJobByMultiUseType`, data);
};
export const useGetAllJobByMultiUseType = () => {
  return useMutation(GetAllJobByMultiUseType, {});
};
