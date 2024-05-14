import React, { useContext, useEffect, useState } from 'react';
import { UseGetUser } from '../../../core/services/api/User.api';
import { ListTable } from 'components/common/ListTable/ListTable';
import { Columns } from './Columns';
import { refetchContext } from 'core/utils/context/EventContext';
import styled from '../AddUser/AddUser.module.scss';
import { FormDivider } from 'components/common/Form/FormDivider/FormDivider';

const UsersList = () => {
  const { data: users, isSuccess, isLoading } = UseGetUser();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    if (isSuccess && users?.data) {
      const usersData: any = users?.data;
      setTableData(usersData);
    }
  }, [users, isSuccess, refetchEvent.userList]);

  return (
    <FormDivider textHeader="لیست کاربران" classNames={styled.formStyle}>
      <ListTable
        columns={Columns}
        tableData={tableData}
        onPageChange={() => {}}
        getCustomProps={{ setTableData }}
        isLoading={isLoading}
      />
    </FormDivider>
  );
};

export default UsersList;
