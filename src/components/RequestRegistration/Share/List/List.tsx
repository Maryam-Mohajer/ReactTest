import React, { useEffect, useState } from 'react';
import { useGetAllChangeUserRequestsForOthers } from '../../../../core/services/api/change-user-request';
import { ListTable } from 'components/common/ListTable/ListTable';
import { Columns } from './Columns';
interface Props {
  requesterRole: any;
}
const CountyList = ({ requesterRole }: Props) => {
  const {
    data: AllChangeuserRequestData,
    mutate: getAllChangeuserRequestMutate,
    isSuccess: isGetAllRequestSuccess,
    isLoading: isGetAllRequestLoading,
  } = useGetAllChangeUserRequestsForOthers();

  const [tableData, setTableData] = useState<any>([]);
  useEffect(() => {
    getAllChangeuserRequestMutate({
      page: 1,
      pageSize: 14,
      requesterRole: requesterRole,
    });
  }, []);

  useEffect(() => {
    const newRequestResults: any = [];
    if (AllChangeuserRequestData && AllChangeuserRequestData.data) {
      const getRequestResult = AllChangeuserRequestData.data.result.items;
      getRequestResult.forEach((result: any) => newRequestResults.push({ ...result }));
    }
    setTableData(newRequestResults);
  }, [AllChangeuserRequestData, isGetAllRequestSuccess]);


  return (
    <>
      <ListTable onPageChange={() => {}} tableData={tableData} columns={Columns} isLoading={isGetAllRequestLoading} />
    </>
  );
};

export default CountyList;
