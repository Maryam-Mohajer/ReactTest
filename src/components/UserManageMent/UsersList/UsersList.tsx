import { ListTable } from 'components/common/ListTable/ListTable';
import React from 'react';
import { Columns } from './Columns';
import { GroupedUserInfo } from '../UserManagement';
interface Props {
  tableData: GroupedUserInfo[];
  setTableData: (value: GroupedUserInfo[]) => void;
  setIsInEditMode: (value: boolean) => void;
  onEditValues: (values: GroupedUserInfo) => void;
}
const UsersList = ({ tableData, setTableData, setIsInEditMode, onEditValues }: Props) => {
  return (
    <div style={{ margin: '0 1.1rem' }}>
      <ListTable
        tableData={tableData}
        onPageChange={() => {}}
        columns={Columns}
        getCustomProps={{ tableData, setTableData, setIsInEditMode, onEditValues }}
      />
    </div>
  );
};

export default UsersList;
