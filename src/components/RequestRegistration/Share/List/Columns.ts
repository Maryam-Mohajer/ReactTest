import Actions from './Actions';

export const Columns = [
  {
    Header: 'ردیف',
    accessor: 'rowNumber',
    columns: [
      {
        Header: '',
        accessor: 'rowNumber',
        disableFilters: true,
        width: 40,
      },
    ],

    disableFilters: true,
  },
  {
    Header: 'شناسه',
    accessor: 'groupId',
    columns: [
      {
        Header: '',
        accessor: 'groupId',
        disableFilters: true,
        width: 40,
      },
    ],

    disableFilters: true,
  },
  {
    Header: 'کاربر فعلی',
    columns: [
      {
        Header: 'نام',
        accessor: 'currentUserInfo.firstName',
        disableFilters: true,
      },
      {
        Header: 'نام خانوادگی',
        accessor: 'currentUserInfo.lastName',
        disableFilters: true,
      },
      {
        Header: 'شماره تلفن',
        accessor: 'currentUserInfo.phoneNumber',
        width: 100,
        disableFilters: true,
      },
    ],
    disableFilters: true,
  },
  {
    Header: 'کاربر جدید',
    columns: [
      {
        Header: 'نام',
        accessor: 'newUserInfo.firstName',
        disableFilters: true,
      },
      {
        Header: 'نام خانوادگی',
        accessor: 'newUserInfo.lastName',
        disableFilters: true,
      },
      {
        Header: 'شماره تلفن',
        accessor: 'newUserInfo.phoneNumber',
        width: 100,
        disableFilters: true,
      },
    ],
    disableFilters: true,
  },

  {
    Header: 'عملیات ',
    accessor: 'operations',
    disableFilters: true,
    Cell: Actions,
  },
];
