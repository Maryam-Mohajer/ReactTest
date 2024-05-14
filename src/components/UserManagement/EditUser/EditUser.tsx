import { FormDivider } from '../../../components/common/Form/FormDivider/FormDivider';
import { TextInput } from '../../../components/common/Form/InputComponents/TextInputComponents/TextInput/TextInput';
import BasicSelectOption from '../../../components/common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { SubmitButton } from '../../../components/common/Form/SubmitButtonComponent/SubmitButton/SubmitButton';
import TreeColumn from '../../../components/common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn';
import { GradeData } from '../../../core/data/grade.data';
import { GradeEnum, GradeLabel } from '../../../core/enums/grade.enum';
import { UseGetUserById, UseUpdatedUser } from '../../../core/services/api/User.api';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { FallBackSpinner } from 'components/common/Spinner/FallBackSpinner/FallbackSpinner';
import { showToast } from 'core/utils';
import { ToastTypes } from 'core/enums';
import styled from './EditUser.module.scss';
import { CardWrapper } from 'components/common/Wrapper/CardWrapper/CardWrapper';
import { UsersValidate } from 'core/validations/Users-validations';
import { Button } from 'reactstrap';
import SimpleButton from 'components/common/Buttons/SimpleButton/SimpleButton';

const EditUserPage = () => {
  const { id } = useParams<any>();

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
    const response = getUserById.data?.data;
    if (response) {
      setSelectedUser(response);
    }
  }, [id, getUserById.data]);

  const initialalues = {
    name: selectedUser.name,
    lastName: selectedUser.lastName,
    fatherName: selectedUser.fatherName,
    phoneNumber: selectedUser.phoneNumber,
    grade: {
      value: selectedUser.grade,
      label: selectedUser.grade == GradeEnum.Masters ? GradeLabel[GradeEnum.Masters] : GradeLabel[GradeEnum.Diplom],
    },
    university: selectedUser.university,
  };

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
      },
      onError: () => {
        showToast(['مشکلی به وجود امده است'], ToastTypes.error);
      },
    });
  };

  return (
    <div className={styled.editeUserContainer}>
      {getUserById.isLoading && <FallBackSpinner />}
      <CardWrapper>
        <FormDivider textHeader="مشاهده و ویرایش اطلاعات کاربر" classNames={styled.formStyle}>
          <Formik
            initialValues={initialalues}
            onSubmit={handleEdite}
            enableReinitialize={true}
            validationSchema={UsersValidate}
          >
            {({ values }) => (
              <Form>
                <TreeColumn>
                  <div>
                    <TextInput
                      name="name"
                      value={values.name}
                      placeholder="لطفا نام خود را وارد نمایید."
                      lableText="نام"
                      type="text"
                    />
                    <TextInput
                      name="lastName"
                      value={values.lastName}
                      placeholder="لطفا نام خانوادگی خود را وارد نمایید.."
                      lableText="نام خانوادگی"
                      type="text"
                    />
                  </div>
                  <div>
                    <TextInput
                      name="fatherName"
                      value={values.fatherName}
                      lableText="نام پدر"
                      placeholder="لطفا نام پدر را وارد نمایید"
                      type="text"
                    />
                    <TextInput
                      name="phoneNumber"
                      value={values.phoneNumber}
                      lableText="شماره تلفن"
                      type="phoneNumber"
                      placeholder="شماره تلفن .."
                    />
                  </div>
                  <div>
                    <BasicSelectOption
                      name="grade"
                      data={GradeData}
                      lableText="تحصیلات"
                      placeHolder="انتخاب کنید .. "
                      selectedDefault={values.grade.label}
                    />
                    {values.grade && values.grade.value == GradeEnum.Masters && (
                      <TextInput
                        name="university"
                        value={values.university}
                        placeholder="دانشگاه"
                        lableText="دانشگاه"
                      />
                    )}
                  </div>
                </TreeColumn>
                <SubmitButton
                  isLoading={editUser.isLoading}
                  btnText={'ثبت ویرایش'}
                  color="#49b9a6"
                
                />
              </Form>
            )}
          </Formik>
        </FormDivider>
        <div className={styled.btnContainer}>
          <button
            className={[styled['btn-lightGreen'], styled.btnBack].join(' ')}
            onClick={() => window.open('/Users')}
          >
            بازگشت{' '}
          </button>
        </div>
      </CardWrapper>
    </div>
  );
};

export default EditUserPage;
