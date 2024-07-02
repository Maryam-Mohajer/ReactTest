import React from 'react';
import RequestRegistration from 'components/RequestRegistration/Share/RequestRegistration';
import { RoleEnum, RoleEnumInfos } from 'core/enums/role.enum';

const UnionAdminRequest = () => {
  return (
    <>
      <RequestRegistration
        requesterRole={{ label: RoleEnumInfos[RoleEnum.UnionAdmin].label, value: RoleEnum.UnionAdmin }}
      />
    </>
  );
};

export default UnionAdminRequest;
