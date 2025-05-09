import { CardWrapper } from 'components/common/Wrapper/CardWrapper/CardWrapper';
import React, { useState } from 'react';
import AddUsers from './AddUsers/AddUsers';
import UsersList from './UsersList/UsersList';
import GoToTopButton from 'components/common/Buttons/GoToTopButton/GoToTopButton';

export interface EducatedProps {
  value: number;
  label: string;
}
export interface UserInfo {
  id: number;
  name: string;
  lastName: string;
  fathername: string;
  phoneNumber: string;
  grade: EducatedProps;
  university: EducatedProps[];
}
export interface GroupedUserInfo {
  groupId?: number;
  users: UserInfo[];
}
const UserManagement = () => {
  const [tableData, setTableData] = useState<GroupedUserInfo[]>([]);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [initialvalues, setInitialvalues] = useState<GroupedUserInfo>({
    users: [
      {
        id: 0,
        name: '',
        lastName: '',
        fathername: '',
        phoneNumber: '',
        grade: { value: 0, label: 'انتخاب کنید ..' },
        university: [],
      },
    ],
  });
  const handleEdite = (values: GroupedUserInfo) => {
    setInitialvalues({
      groupId: values.groupId,
      users: [...values.users],
    });
  };
  return (
    <>
      <CardWrapper>
        <AddUsers
          setTableData={setTableData}
          tableData={tableData}
          initialvalues={initialvalues}
          setInitialvalues={setInitialvalues}
          isInEditMode={isInEditMode}
          setIsInEditMode={setIsInEditMode}
        />
      </CardWrapper>
      <CardWrapper>
        <UsersList
          tableData={tableData}
          onEditValues={handleEdite}
          setIsInEditMode={setIsInEditMode}
          setTableData={setTableData}
        />
        <GoToTopButton />
      </CardWrapper>
    </>
  );
};

export default UserManagement;
