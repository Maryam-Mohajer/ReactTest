import { FormDivider, MultiSelectOption, SubmitButton, TextArea } from 'components/common/Form';
import { InputGroupSearch } from 'components/common/Form/InputComponents/InputGroupSearch/InputGroupSearch';
import {
  useGetUserByNationalCode,
  useSetChangeUserRequestForOthers,
} from '../../../core/services/api/change-user-request';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { RoleEnum, RoleEnumInfos } from 'core/enums/role.enum';
import { RoleData } from 'core/data/RoleData.data';
import { BasicChangesData } from 'core/data/basic-changes.data';
import { TwoColumn } from 'components/common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn';
import { BaseChangesEnum } from 'core/enums/basic-changes.enum';
import { ChangesReasonsData } from 'core/data/changes-reasons.data';
import { showToast } from 'core/utils/show-toast';
import { ToastTypes } from 'core/enums';
import { Alert } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { UserSchema } from 'core/validations/Users-validation';
import BasicSelectOption from 'components/common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { useGetAllUseTypes, useGetOwnedUserUnionForAdmin } from 'core/services/api/union.api';
import { useGetOwnedUserCountyGuildRoomsForAdmin } from 'core/services/api/guild-room.api';
import BaseChangeManagement from './RequestRegistration/BaseChangeManagement';
import FileComponent from './RequestRegistration/FileComponent';

interface Props {
  requesterRole: RoleEnum;
}
const RequestRegistration = ({ requesterRole }: Props) => {
  const changeUserRequest = useSetChangeUserRequestForOthers();
  const getUserByNationalCode = useGetUserByNationalCode();

  const getAllUseTypes = useGetAllUseTypes();
  const getCountyGuildRoomForAdmin = useGetOwnedUserCountyGuildRoomsForAdmin();
  const getUnionForAdmin = useGetOwnedUserUnionForAdmin();

  const [initialvalues, setinitialvalues] = useState({
    currentNationalCode: '',
    newNationalCode: '',
    rolesToChange: [],
    baseChanges: [],
    licenseRequest: '',
    useTypes: [],
    jobs: [],
    province: null,
    county: null,
    cityOrVillage: null,
    countyUnion: null,
    changesReasons: null,
    fileLicenseNumber: '',
    fileLicenseDate: '',
    fileDescription: '',
    file: '',
    description: '',
  });

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newUser, setNewUser] = useState<any>(null);
  const [baseChangesOptions, setBaseChangesOptions] = useState<any>([]);

  const handleuserSearch = (nationalCode: string, setuser: any) => {
    setuser(null);
    if (nationalCode) {
      getUserByNationalCode.mutate(nationalCode, {
        onSuccess: (data: any) => {
          const result = data.data.result;
          if (result) {
            const userObject = {
              id: result.id,
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
        onError: (err) => {},
      });
    } else {
      showToast(['لطفا کد ملی را وارد نمایید'], ToastTypes.error);
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

  const handleSelectedRoleChanges = (roles: any, setFieldValue: any, baseChanges: any) => {
    setFieldValue('rolesToChange', roles);
    setFieldValue(
      'baseChanges',
      baseChanges.filter((baseChange: any) =>
        roles.some(
          (role: any) =>
            role.level === RoleEnumInfos[RoleEnum.UnionExpert].level && baseChange.value === BaseChangesEnum.UseType,
        ),
      ),
    );

    const filterdBaseChanges = BasicChangesData[0].options.filter(
      (base: any) => base.value !== BaseChangesEnum.UseType,
    );

    return roles.map((role: any) =>
      role.level === RoleEnumInfos[RoleEnum.UnionExpert].level
        ? setBaseChangesOptions(BasicChangesData)
        : setBaseChangesOptions([{ label: 'یک گزینه را انتخاب کنید', options: filterdBaseChanges }]),
    );
  };

  const handleSelectedbaseChanges = (baseChanges: any, setFieldValue: any) => {
    setFieldValue('baseChanges', baseChanges);

    baseChanges.map((baseChange: any) => {
      if (baseChange.value === BaseChangesEnum.UseType) {
        getAllUseTypes.refetch();
      }
      if (
        baseChange.value === BaseChangesEnum.MainLocationDivision &&
        requesterRole === RoleEnum.CountyGuildRoomAdmin
      ) {
        getCountyGuildRoomForAdmin.refetch();
      } else {
        getUnionForAdmin.refetch();
      }
    });
  };

  const isSameLevel = (roles: any) => {
    if (!roles || roles.length === 0) {
      return true;
    }
    const levels = roles.map((role: any) => role.level);
    return levels.every((level: any) => level === levels[0]);
  };

  const resetToDefault = ({ resetForm }: any) => {
    resetForm();
    setCurrentUser(null);
    setNewUser(null);
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    if (!values.file || !(values.file.length > 0)) {
      showToast(['لطفا فایل را انتخاب کنید!'], ToastTypes.error);
      return;
    }
    const formData: any = new FormData();

    if (values.file) {
      for (let file of values.file) {
        formData.append(`File`, file);
      }
    }
    const obj: any = {
      BaseChangesTypes: values.baseChanges.map((change: any) => change.value),
      RolesToChange: values.rolesToChange.map((role: any) => role.value),
      RequesterRole: requesterRole,
      CurrentUserInfoId: currentUser.id,
      IsSelectAllUseType: false,
      IsSelectAllJob: false,
      ChangesReasonsEnum: values.changesReasons ? values.changesReasons.value : null,
      Description: values.description,
      FileLicenseNumber: values.fileLicenseNumber,
      FileLicenseDate: values.fileLicenseDate,
      FileDescription: values.fileDescription,
    };

    Object.keys(obj).map(function (key, index) {
      formData.append(key, obj[key]);
    });

    values.province && formData.append('ProvinceId', values.province);
    values.county && formData.append('CountyId', values.county.value);
    values.cityOrVillage && formData.append('CityOrVillageId', values.cityOrVillage.value);
    values.countyUnion && formData.append('CountyUnionId', values.countyUnion.value);
    values.useTypes.length > 0 &&
      values.useTypes.forEach((type: any, index: any) => formData.append(`UseTypeIds[${index}]`, type.value));
    values.jobs.length > 0 &&
      values.jobs.forEach((job: any, index: any) => formData.append(`JobIds[${index}]`, job.value));
    values.licenseRequest && formData.append('LicenseRequestId', parseInt(values.licenseRequest));

    changeUserRequest.mutate(formData, {
      onSuccess: (data) => {
        showToast(['اطلاعات با موفقیت ثبت شد'], ToastTypes.success);
        resetToDefault({ resetForm });
      },

      onError: (error: any) => {
        showToast(['در ثبت اطلاعات مشکلی به وجود آمده است'], ToastTypes.error);
        resetToDefault({ resetForm });
      },
    });
  };

  return (
    <FormDivider textHeader="">
      <Formik
        initialValues={initialvalues}
        validationSchema={() => UserSchema(requesterRole)}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, handleChange, setFieldValue, resetForm }) => (
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
                <div>
                  <MultiSelectOption
                    options={RoleData}
                    name="rolesToChange"
                    hasLabel
                    labelText="نقش"
                    placeHolder="لطفا نقش را وارد نمایید"
                    significant
                    onChange={(roles: any) => {
                      handleSelectedRoleChanges(roles, setFieldValue, values.baseChanges);
                    }}
                  />
                  {!isSameLevel(values.rolesToChange) && (
                    <p className="text-danger" style={{ fontSize: '12px' }}>
                      تنها نقش های هم سطح را می توانید انتخاب کنید
                    </p>
                  )}
                </div>
                <div>
                  <MultiSelectOption
                    options={baseChangesOptions}
                    name="baseChanges"
                    hasLabel
                    labelText="مبنای تغییرات"
                    placeHolder="یک گزینه را انتخاب نمایید"
                    significant
                    onChange={(baseChanges) => {
                      handleSelectedbaseChanges(baseChanges, setFieldValue);
                    }}
                  />
                  {!isSameLevel(values.baseChanges) && (
                    <p className="text-danger" style={{ fontSize: '12px' }}>
                      تنها مبناهای هم سطح را می توانید انتخاب کنید
                    </p>
                  )}
                </div>
              </TwoColumn>
            </div>
            {values.baseChanges && values.baseChanges.length > 0 && (
              <BaseChangeManagement
                values={values}
                setFieldValue={setFieldValue}
                UseTypeMutation={getAllUseTypes}
                countyMutation={getCountyGuildRoomForAdmin}
                unionMutation={getUnionForAdmin}
              />
            )}

            <>
              <BasicSelectOption
                data={ChangesReasonsData}
                name="changesReasons"
                lableText="ادله ی تغییرات"
                placeHolder="یک گزینه را انتخاب نمایید"
                significant
              />
              <FileComponent values={values} />
              <TextArea
                lableText="توضیحات"
                name="description"
                placeholder="توضیحات"
                significant
                value={values.description}
              />
            </>
            <SubmitButton
              isLoading={changeUserRequest.isLoading}
              btnText="ثبت اطلاعات"
              clearable
              clearableTxt="پاک کردن فرم"
              onClear={() => {
                resetForm();
              }}
            />
          </Form>
        )}
      </Formik>
    </FormDivider>
  );
};

export default RequestRegistration;
