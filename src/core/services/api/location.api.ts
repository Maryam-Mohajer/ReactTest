import { AxiosResponse } from 'axios';
import { IAxiosResult } from 'core/models/axios-result.model';
import methods from '../interceptors/http.interceptor';
import { useMutation } from 'react-query';

const MainUrl = process.env.REACT_APP_SABAK_PATH;

const GetAllCityOrRuralTitles = async (countiesId: number[]): Promise<AxiosResponse<IAxiosResult>> => {
  const selectedIds = countiesId.map((countyId: any) => `countiesId=${countyId}&`);
  return await methods.get(`${MainUrl}/api/Location/GetAllCityOrRuralTitles?${selectedIds}`);
};

export const useGetAllCityOrRuralTitles = () => {
  return useMutation(GetAllCityOrRuralTitles, {});
};
