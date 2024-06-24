import React, { useEffect } from 'react';
import { useGetAllChangeUserRequestsForOthers } from '../../../../core/services/api/change-user-request';
const CountyList = () => {
  const getChangeUserRequest = useGetAllChangeUserRequestsForOthers();

  useEffect(() => {
    getChangeUserRequest.mutate({
      page: 1000,
      pageSize: 10,
      requesterRole: 1,
    });
  }, []);
  console.log(getChangeUserRequest.data, 'data');

  return <div>CountyList</div>;
};

export default CountyList;
