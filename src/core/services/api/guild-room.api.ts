import { AxiosResponse } from 'axios';
import { IAxiosResult } from 'core/models/axios-result.model';
import methods from '../interceptors/http.interceptor';
import { useQuery } from 'react-query';

const MainUrl = process.env.REACT_APP_SABAK_PATH;

const GetOwnedUserCountyGuildRoomsForAdmin = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/GuildRoom/GetOwnedUserCountyGuildRoomsForAdmin`);
};

export const useGetOwnedUserCountyGuildRoomsForAdmin = () => {
  return useQuery('GetOwnedUserCountyGuildRoomsForAdmin', GetOwnedUserCountyGuildRoomsForAdmin , {
    enabled : false
  });
};
