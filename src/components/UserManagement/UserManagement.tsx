import React from 'react';
import AddUser from './AddUser/AddUser';
import UsersList from './UsersList/UsersList';
import { CardWrapper } from 'components/common/Wrapper/CardWrapper/CardWrapper';
import styled from './UserManagement.module.scss';
import TopButton from './../common/Buttons/TopButton/TopButton';

export interface User {
  name: string;
  lastName: string;
  fatherName: string;
  phoneNumber: string;
  grade: Grade;
  university: string;
}

interface Grade {
  value: number;
  label: string;
}

export interface UserInfo {
  id?: string;
  name: string;
  lastname?: string;
  fatherName: string;
  phoneNumer?: string;
  grade: string;
  university: string;
  lastName: string;
  phoneNumber: string;
}
const UserManagement = () => {
  return (
    <div className={styled.userManageStyle}>
      <CardWrapper>
        <AddUser />
      </CardWrapper>
      <CardWrapper>
        <UsersList />
        <TopButton />
      </CardWrapper>
    </div>
  );
};

export default UserManagement;
