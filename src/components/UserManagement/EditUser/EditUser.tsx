import { GradeEnum, GradeLabel } from '../../../core/enums/grade.enum';
import { UseGetUserById, UseUpdatedUser } from '../../../core/services/api/User.api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { showToast } from 'core/utils';
import { ToastTypes } from 'core/enums';
import styled from './EditUser.module.scss';
import { CardWrapper } from 'components/common/Wrapper/CardWrapper/CardWrapper';

import { useHistory } from 'react-router-dom';
import UserFieldForm from '../common/UserFieldForm';

const EditUserPage = () => {
  const { id } = useParams<any>();
  const history = useHistory();
  const getUserById = UseGetUserById(id);
  const editUser = UseUpdatedUser(id);

  const [selectedUser, setSelectedUser] = useState<any>({
    name: '',
    lastName: '',
    fatherName: '',
    phoneNumber: '',
    grade: { value: 0, label: '' },
    university: '',
  });

  useEffect(() => {
    const response: any = getUserById.data?.data;
    if (response) {
      setSelectedUser({
        ...response,
        grade: {
          value: parseInt(response.grade) === GradeEnum.Masters ? GradeEnum.Masters : GradeEnum.Diplom,
          label:
            parseInt(response.grade) === GradeEnum.Masters
              ? GradeLabel[GradeEnum.Masters]
              : GradeLabel[GradeEnum.Diplom],
        },
      });
    }
  }, [id, getUserById.data]);

  const handleEdite = (value: any) => {
    const newObj: any = {
      name: value.name,
      lastName: value.lastName,
      fatherName: value.fatherName,
      phoneNumber: value.phoneNumber,
      grade: value.grade.value == GradeEnum.Masters ? GradeEnum.Masters : GradeEnum.Diplom,
      university: value.university,
      lastname: value.lastName,
      phoneNumer: value.phoneNumber,
    };
    editUser.mutate(newObj, {
      onSuccess: (val: any) => {
        showToast(['با موفقیت ویرایش شد'], ToastTypes.success);
        history.push('/Users');
      },
      onError: () => {
        showToast(['مشکلی به وجود امده است'], ToastTypes.error);
      },
    });
  };

  return (
    <div className={styled.editeUserContainer}>
      <CardWrapper>
        <UserFieldForm
          getMutateById={getUserById}
          textHeader="مشاهده و ویرایش اطلاعات کاربر"
          initialValues={selectedUser}
          getMutate={editUser}
          submitBtnText="ثبت ویرایش"
          clearable
          clearableTxt="لغو ویرایش"
          onClear={() => {
            history.push('/Users');
          }}
          onSubmit={(value: any) => handleEdite(value)}
        />
      </CardWrapper>
    </div>
  );
};

export default EditUserPage;
