import React, { useContext } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { Card } from 'reactstrap';
import { FormDivider } from 'components/common/Form/FormDivider/FormDivider';
import TreeColumn from 'components/common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn';
import { SubmitButton, TextInput } from 'components/common/Form';
import { UseAddUser } from '../../../core/services/api/User.api';
import BasicSelectOption from 'components/common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { GradeData } from 'core/data/grade.data';
import { GradeEnum } from '../../../core/enums/grade.enum';
import { User, UserInfo } from '../UserManagement';
import { refetchContext } from 'core/utils/context/EventContext';
import { showToast } from 'core/utils';
import { ToastTypes } from 'core/enums';
import { UsersValidate } from '../../../core/validations/Users-validations';
import styled from './AddUser.module.scss';

const AddUser = () => {
  const adduser = UseAddUser();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const initialValues = {
    name: '',
    lastName: '',
    fatherName: '',
    phoneNumber: '',
    grade: { value: 0, label: '' },
    university: '',
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    const newObj: UserInfo = {
      name: values.name,
      lastName: values.lastName,
      fatherName: values.fatherName,
      phoneNumber: values.phoneNumber,
      grade: values.grade.value,
      university: values.university,
    };
    adduser.mutate(newObj, {
      onSuccess: (value: any) => {
        const newEvent = { ...refetchEvent };
        newEvent.userList = !newEvent.userList;
        setRefetchEvent(newEvent);
        resetForm();
        showToast(['با موفقیت انجام شد'], ToastTypes.success);
      },
      onError: () => {
        showToast(['مشکلی به وجود امده است'], ToastTypes.error);
      },
    });
  };

  return (
    <>
      <Card>
        <FormDivider textHeader="افزودن کاربر" classNames={styled.formStyle}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={UsersValidate}>
            {({ values }) => (
              <Form>
                <TreeColumn>
                  <div>
                    <TextInput
                      name="name"
                      value={initialValues.name}
                      placeholder="لطفا نام خود را وارد نمایید."
                      lableText="نام"
                      type="text"
                    />
                    <TextInput
                      name="lastName"
                      value={initialValues.lastName}
                      placeholder="لطفا نام خانوادگی خود را وارد نمایید.."
                      lableText="نام خانوادگی"
                      type="text"
                    />
                  </div>
                  <div>
                    <TextInput
                      name="fatherName"
                      value={initialValues.fatherName}
                      lableText="نام پدر"
                      placeholder="لطفا نام پدر را وارد نمایید"
                      type="text"
                    />
                    <TextInput
                      name="phoneNumber"
                      value={initialValues.phoneNumber}
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
                    />
                    {values.grade && values.grade.value === GradeEnum.Masters && (
                      <TextInput
                        name="university"
                        value={initialValues.university}
                        placeholder="دانشگاه"
                        lableText="دانشگاه"
                      />
                    )}
                  </div>
                </TreeColumn>
                <SubmitButton isLoading={adduser.isLoading} color={'#49b9a6'} />
              </Form>
            )}
          </Formik>
        </FormDivider>
      </Card>
    </>
  );
};

export default AddUser;
