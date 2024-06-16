import MainLayout from 'components/Layout/MainLayout';

import AddUsers from 'components/UserManageMent/AddUsers/AddUsers';
import UserManagement from 'components/UserManageMent/UserManagement';
import React from 'react';

const Users = () => {
  return (
    <>
      <MainLayout>
        <UserManagement />
        {/* <AddUsers /> */}
      </MainLayout>
    </>
  );
};

export default Users;
