import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { GroupedUserInfo } from '../UserManagement';
import { SweetAlertCallback } from 'components/common/SweetAlert/SweetALertCallback/SweetALertCallback';

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: GroupedUserInfo;
    };
  };
  tableData: GroupedUserInfo[];
  setTableData: (value: GroupedUserInfo[]) => void;
  onEditValues: (values: GroupedUserInfo) => void;
  setIsInEditMode: (value: boolean) => void;
}
const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  tableData,
  setTableData,
  onEditValues,
  setIsInEditMode,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <>
      {showConfirm && (
        <SweetAlertCallback
          title="آیا مطمئنید؟"
          show={showConfirm}
          mutation={false}
          onCancel={() => setShowConfirm(false)}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setTableData(tableData.filter((users: GroupedUserInfo) => users.groupId !== original.groupId && users));
            setShowConfirm(false);
          }}
        >
          آیا از حذف این کاربر مطمئنید؟
        </SweetAlertCallback>
      )}
      <Button
        size="sm"
        color={'warning'}
        onClick={() => {
          onEditValues(original);
          setIsInEditMode(true);
          console.log(original, 'edied item');
        }}
      >
        ویرایش
      </Button>
      <Button
        size="sm"
        color="danger"
        style={{ marginRight: '0.75rem' }}
        onClick={() => {
          setShowConfirm(true);
        }}
      >
        حذف
      </Button>
    </>
  );
};

export default Actions;
