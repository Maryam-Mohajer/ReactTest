import React from 'react';
import RequestRegistration from 'components/RequestRegistration/Share/RequestRegistration';
import { RoleEnum } from 'core/enums/role.enum';

const CountyAdminRequest = () => {
  return (
    <>
      <RequestRegistration requesterRole={RoleEnum.CountyGuildRoomAdmin} />
    </>
  );
};

export default CountyAdminRequest;
