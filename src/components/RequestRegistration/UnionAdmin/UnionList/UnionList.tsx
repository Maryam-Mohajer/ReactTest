import List from 'components/RequestRegistration/Share/List/List';
import { UserRoles } from 'core/enums';
import React from 'react';

const UnionList = () => {
  return (
    <>
      <List requesterRole={UserRoles.UnionAdmin} />
    </>
  );
};

export default UnionList;
