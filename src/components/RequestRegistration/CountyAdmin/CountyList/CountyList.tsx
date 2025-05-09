import React from 'react';
import List from 'components/RequestRegistration/Share/List/List';
import { RoleEnum } from 'core/enums/role.enum';

const CountyList = () => {
  return (
    <>
      <List requesterRole={RoleEnum.CountyGuildRoomAdmin} />
    </>
  );
};

export default CountyList;
