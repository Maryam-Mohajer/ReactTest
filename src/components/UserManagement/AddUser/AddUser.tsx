import React, { useContext, useState } from 'react';
import { Card } from 'reactstrap';
import { UseAddUser } from '../../../core/services/api/User.api';
import { refetchContext } from 'core/utils/context/EventContext';
import { showToast } from 'core/utils';
import { ToastTypes } from 'core/enums';
import UserFieldForm from '../common/UserFieldForm';

const AddUser = () => {
  const adduser = UseAddUser();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const [initialValues, setInitialValues] = useState({
    name: '',
    lastName: '',
    fatherName: '',
    phoneNumber: '',
    grade: { value: 0, label: 'انتخاب کنید..' },
    university: '',
  });

  const handleSubmit = (values: any, { resetForm }: any) => {
    const newObj: any = {
      name: values.name,
      lastName: values.lastName,
      fatherName: values.fatherName,
      phoneNumber: values.phoneNumber,
      grade: values.grade.value,
      university: values.university,
      lastname: values.lastName,
      phoneNumer: values.phoneNumber,
    };
    adduser.mutate(newObj, {
      onSuccess: (value: any) => {
        showToast(['با موفقیت انجام شد'], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.usersList = !newEvent.usersList;
        setRefetchEvent(newEvent);
        resetForm();
      },
      onError: () => {
        showToast(['مشکلی به وجود امده است'], ToastTypes.error);
      },
    });
  };

  return (
    <>
      <Card>
        <UserFieldForm
          textHeader="افزودن کاربر"
          initialValues={initialValues}
          addValues={initialValues}
          onSubmit={(values, resetForm) => handleSubmit(values, resetForm)}
          getMutate={adduser}
          clearable
          clearableTxt="پاک کردن فرم"
          onClear={() =>
            setInitialValues({
              name: '',
              lastName: '',
              fatherName: '',
              phoneNumber: '',
              grade: { value: 0, label: '' },
              university: '',
            })
          }
        />
      </Card>
    </>
  );
};

export default AddUser;
