import React, { useContext, useEffect, useState } from 'react';
import { UseGetUser } from '../../../core/services/api/User.api';
import { ListTable } from 'components/common/ListTable/ListTable';
import { Columns } from './Columns';
import { refetchContext } from 'core/utils/context/EventContext';
import styled from '../UserManagement.module.scss';
import { FormDivider } from 'components/common/Form/FormDivider/FormDivider';

const UsersList = () => {
  const getUsers = UseGetUser();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    if (getUsers?.data?.data) {
      getUsers.refetch();
    }
  }, [refetchEvent.usersList]);

  useEffect(() => {
    if (getUsers.isSuccess && getUsers?.data.data) {
      const usersData: any = getUsers?.data.data;
      setTableData(usersData);
    }
  }, [getUsers.data, getUsers.isSuccess]);

  return (
    <FormDivider textHeader="لیست کاربران" classNames={styled.formStyle}>
      <ListTable
        columns={Columns}
        tableData={tableData}
        onPageChange={() => {}}
        getCustomProps={{ setTableData }}
        isLoading={getUsers.isLoading}
      />
    </FormDivider>
  );
};

export default UsersList;
