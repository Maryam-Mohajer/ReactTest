import Actions from './Actions/Actions';
export const Columns = [
  {
    Header: 'شناسه',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'نام',
    accessor: 'name',
    disableFilters: true,
  },
  {
    Header: 'نام خانوادگی',
    accessor: 'lastName',
    disableFilters: true,
  },
  {
    Header: 'شماره تلفن',
    accessor: 'phoneNumber',
    disableFilters: true,
  },
  {
    Header: 'عملیات',
    accessor: 'operations',
    disableFilters: true,
    Cell: Actions,
    getProps: (props: any) => ({
      setTableData: props.setTableData,
    }),
  },
];
