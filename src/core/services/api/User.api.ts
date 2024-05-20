import methods from '../interceptors/http.interceptor';
import { IAxiosResult } from 'core/models/axios-result.model';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { UserInfo } from 'components/UserManagement/UserManagement';

const MainUrl = 'https://6249e521fd7e30c51c085463.mockapi.io/api/info';

const AddUser = async (value: UserInfo): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(MainUrl, value);
};

const getUser = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(MainUrl);
};

const GetUserById = async (id: number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/${id}`);
};
const UpdatedUser = async (id: number, data: UserInfo): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(`${MainUrl}/${id}`, data);
};

const DeleteUser = async (id: number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(`${MainUrl}/${id}`);
};
export const UseAddUser = () => {
  return useMutation(AddUser, {});
};
export const UseGetUser = () => {
  return useQuery('getUser', getUser);
};
export const UseGetUserById = (id: number) => {
  return useQuery(['GetUserById', id], () => GetUserById(id));
};
export const UseUpdatedUser = (id: number) => {
  return useMutation((data: UserInfo) => UpdatedUser(id, data));
};
export const UseDeleteUser = () => {
  return useMutation((id: number) => DeleteUser(id), {});
};
