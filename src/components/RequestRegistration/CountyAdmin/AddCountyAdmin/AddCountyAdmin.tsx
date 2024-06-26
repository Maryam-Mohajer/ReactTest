import { DropZone, FormDivider, MultiSelectOption, SubmitButton, TextArea, TextInput } from 'components/common/Form';
import { InputGroupSearch } from 'components/common/Form/InputComponents/InputGroupSearch/InputGroupSearch';
import {
  useGetUserByNationalCode,
  useSetChangeUserRequestForOthers,
} from '../../../../core/services/api/change-user-request';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { RoleEnum } from 'core/enums/role.enum';
import { RoleData } from 'core/data/RoleData.data';
import { BasicChangesData } from 'core/data/basic-changes.data';
import TreeColumn from 'components/common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn';
import { TwoColumn } from 'components/common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn';
import { BaseChangesTypeEnum } from 'core/enums/basic-changes.enum';
import { ChangesReasonsData } from 'core/data/changes-reasons.data';
import { ChangesReasonsEnum } from 'core/enums/changes-reasons.enum';
import { showToast } from 'core/utils/show-toast';
import { ToastTypes } from 'core/enums';
import { Alert } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { UsersValidate } from 'core/validations/Users-validation';

const AddCountyAdmin = () => {
  const changeUserRequest = useSetChangeUserRequestForOthers();
  const getUserByNationalCode = useGetUserByNationalCode();

  const [initialvalues, setinitialvalues] = useState({
    currentNationalCode: '',
    newNationalCode: '',
    rolesToChange: { value: 0, label: '', level: '' },
    baseChanges: { value: 0, label: '' },
    licenseRequest: '',
    UseTypeIds: [],
    JobIds: [],
    CountyId: '',
    CityOrVillageId: '',
    CountyUnionId: '',
    changesReasons: { value: 0, label: ' ' },
    fileLicenseNumber: '',
    fileLicenseDate: '',
    fileDescription: '',
    file: '',
    description: '',
  });
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newUser, setNewUser] = useState<any>(null);

  const handleuserSearch = (nationalCode: string, setuser: any) => {
    setuser(null);
    if (nationalCode) {
      getUserByNationalCode.mutate(nationalCode, {
        onSuccess: (data: any) => {
          const result = data.data.result;
          if (result) {
            const userObject = {
              name: result.name,
              lastName: result.lastName,
              fathersName: result.fathersName,
              nationalCode: result.nationalCode,
              cellphone: result.cellphone,
              email: result.email,
            };
            setuser(userObject);
          }
        },
      });
    }
  };
  const renderUser = (user: any) => {
    return (
      <div style={{ marginTop: '1rem' }}>
        <Alert>
          <p>
            نام : {user.name}
            {user.lastName}
          </p>{' '}
          <p>نام پدر :‌{user.fathersName}</p> <p>شماره تلفن :‌{user.cellphone}</p>
          <p>کد ملی : {user.nationalCode}</p>
          ایمیل : {user.email}
        </Alert>
      </div>
    );
  };
  const handleSubmit = () => {};

  return (
    <FormDivider textHeader="">
      <Formik
        initialValues={initialvalues}
        onSubmit={() => {
          handleSubmit();
        }}
        enableReinitialize={true}
        validationSchema={UsersValidate}
      >
        {({ values, handleChange }) => (
          <Form>
            <TwoColumn>
              <FormGroup>
                <InputGroupSearch
                  value={values.currentNationalCode}
                  name="currentNationalCode"
                  handleChange={handleChange}
                  onSearch={() => handleuserSearch(values.currentNationalCode, setCurrentUser)}
                  loading={values.currentNationalCode ? getUserByNationalCode.isLoading : false}
                  placeholder="لطفا کد ملی را وارد نمایید"
                  lableText="کد ملی کاربر فعلی"
                  significant
                />
                {currentUser && renderUser(currentUser)}
              </FormGroup>
              <FormGroup>
                <InputGroupSearch
                  value={values.newNationalCode}
                  name="newNationalCode"
                  handleChange={handleChange}
                  onSearch={() => handleuserSearch(values.newNationalCode, setNewUser)}
                  loading={values.newNationalCode ? getUserByNationalCode.isLoading : false}
                  placeholder="لطفا کد ملی را وارد نمایید"
                  lableText="کد ملی کاربر جدید"
                  significant
                />
                {newUser && renderUser(newUser)}
              </FormGroup>
            </TwoColumn>
            <div style={{ marginTop: '1rem' }}>
              <TwoColumn>
                <MultiSelectOption
                  options={RoleData}
                  name="role"
                  hasLabel
                  labelText="نقش"
                  placeHolder="لطفا نقش را وارد نمایید"
                  significant
                  onChange={(roles) => {
                    console.log(roles, 'roles');
                  }}
                />
                {}
                <MultiSelectOption
                  options={BasicChangesData}
                  name="baseChanges"
                  hasLabel
                  labelText="مبنای تغییرات"
                  placeHolder="یک گزینه را انتخاب نمایید"
                  significant
                />
              </TwoColumn>
            </div>
            {console.log(
              values.baseChanges.value,
              'values.baseChanges.value',
              BaseChangesTypeEnum.LicenseRequest,
              'BaseChangesTypeEnum.LicenseRequest',
            )}
            {/* {values.baseChanges && values.baseChanges.value === BaseChangesTypeEnum.LicenseRequest && ( */}
            <>
              <TreeColumn>
                <TextInput
                  name="licenseRequest"
                  value={values.licenseRequest}
                  placeholder="شناسه درخواست"
                  lableText="شناسه درخواست"
                  significant
                />
                <MultiSelectOption
                  options={ChangesReasonsData}
                  name="changesReasons"
                  hasLabel
                  labelText="ادله ی تغییرات"
                  placeHolder="یک گزینه را انتخاب نمایید"
                  significant
                />{' '}
                <DropZone name="file" lableText="فایل" significant placeholder="لطفا فایل را بارگذاری نمایید" />
              </TreeColumn>
              <TextArea
                lableText="توضیحات"
                name="description"
                placeholder="توضیحات"
                significant
                value={values.description}
              />
            </>
            {/* )} */}
            <SubmitButton isLoading={false} />
          </Form>
        )}
      </Formik>
    </FormDivider>
  );
};

export default AddCountyAdmin;
