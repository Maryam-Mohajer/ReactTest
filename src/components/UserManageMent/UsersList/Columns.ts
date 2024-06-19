import { GroupedUserInfo, UserInfo } from '../UserManagement';
import Actions from './Actions';

export const Columns = [
  {
    Header: 'ردیف',
    accessor: 'rowNumber',
    disableFilters: true,
  },
  {
    Header: 'شناسه',
    accessor: 'groupId',
    disableFilters: true,
  },
  {
    Header: 'نام',
    accessor: (row: GroupedUserInfo) => row.users.map((user: UserInfo) => user.name).join(', '),
    disableFilters: true,
  },
  {
    Header: 'نام خانوادگی',
    accessor: (row: GroupedUserInfo) => row.users.map((user: UserInfo) => user.lastName).join(', '),
    disableFilters: true,
  },
  {
    Header: 'شماره تلفن',
    accessor: (row: GroupedUserInfo) => row.users.map((user: UserInfo) => user.phoneNumber).join(', '),
    disableFilters: true,
  },
  {
    Header: 'عملیات ',
    accessor: 'operations',
    disableFilters: true,
    Cell: Actions,
    getProps: (props: any) => ({
      tableData: props.tableData,
      onEditValues: props.onEditValues,
      setIsInEditMode: props.setIsInEditMode,
    }),
  },
];
