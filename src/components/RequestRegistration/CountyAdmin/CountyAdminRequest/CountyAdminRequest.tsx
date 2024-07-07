import React from 'react';
import RequestRegistration from 'components/RequestRegistration/Share/RequestRegistration';
import { RoleEnum, RoleEnumInfos } from 'core/enums/role.enum';
export const requesterRole = [
  { label: RoleEnumInfos[RoleEnum.CountyGuildRoomAdmin].label, value: RoleEnum.CountyGuildRoomAdmin },
  { label: RoleEnumInfos[RoleEnum.UnionAdmin].label, value: RoleEnum.UnionAdmin },
];
const CountyAdminRequest = () => {
  return (
    <>
      <RequestRegistration
        requesterRole={{
          label: RoleEnumInfos[RoleEnum.CountyGuildRoomAdmin].label,
          value: RoleEnum.CountyGuildRoomAdmin,
        }}
      />
    </>
  );
};

export default CountyAdminRequest;
