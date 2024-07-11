import React from 'react';
import RequestRegistration from 'components/RequestRegistration/Share/RequestRegistration';
import { RoleEnum } from 'core/enums/role.enum';

const UnionAdminRequest = () => {
  return (
    <>
      <RequestRegistration requesterRole={RoleEnum.UnionAdmin} />
    </>
  );
};

export default UnionAdminRequest;
