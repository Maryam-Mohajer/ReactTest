import List from 'components/RequestRegistration/Share/List/List';
import { UserRoles } from 'core/enums';
import { RoleEnum } from 'core/enums/role.enum';
import React from 'react';

const UnionList = () => {
  return (
    <>
      <List requesterRole={RoleEnum.UnionAdmin} />
    </>
  );
};

export default UnionList;
