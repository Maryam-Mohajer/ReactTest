import { SweetAlertCallback } from 'components/common/SweetAlert/SweetALertCallback/SweetALertCallback';
import { ToastTypes } from 'core/enums';
import { UseDeleteUser } from 'core/services/api/User.api';
import { showToast } from 'core/utils';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
  setTableData: (prev: any) => void;
}
const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  setTableData,
}) => {
  const deleteuser = UseDeleteUser();
  const history = useHistory();
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <>
      {showConfirm && (
        <SweetAlertCallback
          title="آیا مطمئنید؟"
          show={showConfirm}
          onClose={() => setShowConfirm(false)}
          onCancel={() => setShowConfirm(false)}
          mutation={deleteuser}
          onConfirm={() => {
            setShowConfirm(false);
            deleteuser.mutate(+id, {
              onSuccess: (data) => {
                setTableData((prev: any) => prev.filter((item: any) => item.id !== id));
                showToast(['با موفقیت انجام شد'], ToastTypes.success);
              },
              onError: () => {
                showToast(['مشکلی به وجود آمده است'], ToastTypes.error);
              },
            });
          }}
        >
          آیا از پاک کردن این داده مطمئنید؟
        </SweetAlertCallback>
      )}
      <Button
        color="warning"
        size="sm"
        onClick={() => {
          history.push(`/info/${id}`);
        }}
      >
        ویرایش
      </Button>
      <Button
        color="danger"
        size="sm"
        style={{ marginRight: '5px' }}
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
