import Actions from './Actions';

export const Columns = [
  {
    Header: 'ردیف',
    accessor: 'rowNumber',
    columns: [
      {
        Header: '',
        accessor: 'rowNumber',
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
        width: 40,
      },
    ],

    disableFilters: true,
  },
  {
    Header: 'کاربر فعلی',
    columns: [
      {
        Header: 'نام و نام خانوادگی',
        accessor: 'currentUserInfo.fullName',
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
        Header: 'نام و نام خانوادگی',
        accessor: 'newUserInfo.fullName',
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
