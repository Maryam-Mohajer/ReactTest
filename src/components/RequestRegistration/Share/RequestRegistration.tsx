import {
  DropZone,
  FileInput,
  FormDivider,
  ModernDatePicker,
  MultiSelectOption,
  SubmitButton,
  TextArea,
  TextInput,
} from 'components/common/Form';
import { InputGroupSearch } from 'components/common/Form/InputComponents/InputGroupSearch/InputGroupSearch';
import {
  useGetUserByNationalCode,
  useSetChangeUserRequestForOthers,
} from '../../../core/services/api/change-user-request';
import { useGetOwnedUserCountyGuildRoomsForAdmin } from '../../../core/services/api/guild-room.api';
import { useGetAllCityOrRuralTitles } from '../../../core/services/api/location.api';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { RoleEnum, RoleEnumInfos } from 'core/enums/role.enum';
import { RoleData } from 'core/data/RoleData.data';
import { BasicChangesData } from 'core/data/basic-changes.data';
import TreeColumn from 'components/common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn';
import { TwoColumn } from 'components/common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn';
import { BaseChangesInfo, BaseChangesEnum } from 'core/enums/basic-changes.enum';
import { ChangesReasonsData } from 'core/data/changes-reasons.data';
import { ChangesReasonsEnum } from 'core/enums/changes-reasons.enum';
import { showToast } from 'core/utils/show-toast';
import { ToastTypes, UserRoles } from 'core/enums';
import { Alert } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { UserSchema } from 'core/validations/Users-validation';
import BasicSelectOption from 'components/common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { Row, Col } from 'reactstrap';
import { useGetAllUseTypes, useGetOwnedUserUnionForAdmin } from 'core/services/api/union.api';
import { useGetAllJobByMultiUseType } from 'core/services/api/jobs.api';
import { Button } from 'reactstrap';
import PrimaryButton from 'components/common/Buttons/PrimaryButton/PrimaryButton';


interface Props {
  requesterRole: { label: any | undefined; value: any };
}
const RequestRegistration = ({ requesterRole }: Props) => {
  const changeUserRequest = useSetChangeUserRequestForOthers();
  console.log(changeUserRequest, 'changeUserRequest');

  const getUserByNationalCode = useGetUserByNationalCode();

  const {
    data: countyData,
    isLoading: isCountyLoading,
    isSuccess,
    refetch: countyRefetch,
  } = useGetOwnedUserCountyGuildRoomsForAdmin();
  console.log(countyData, 'countyData');

  const getCityOrRural = useGetAllCityOrRuralTitles();
  const {
    data: countyUnionData,
    isLoading: isCountyUnionLoading,
    refetch: countyUnionRefetch,
    isSuccess: isCountyUnionSuccess,
  } = useGetOwnedUserUnionForAdmin();
  const {
    data: useTypesData,
    isLoading: isUseTypesLoading,
    isSuccess: isUseTypesSuccess,
    refetch: refetchUseTypes,
  } = useGetAllUseTypes();

  const getAllJobs = useGetAllJobByMultiUseType();

  const [initialvalues, setinitialvalues] = useState({
    currentNationalCode: '',
    newNationalCode: '',
    rolesToChange: null,
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
  const [countyRoom, setCountyRoom] = useState([]);
  const [cityOrRural, setCityOrRural] = useState([]);
  const [countyUnion, setCountyUnion] = useState([]);
  const [useTypes, setUseTypes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (countyData && countyData?.data) {
      const results = countyData.data.result;
      const counties: any = [];
      results.map((result: any) => counties.push({ value: result.id, label: result.countyTitle }));
      setCountyRoom(counties);
    }
  }, [countyData, isSuccess]);

  useEffect(() => {
    const countyUnionsInfo: any = [];
    if (countyUnionData && countyUnionData?.data) {
      const unionResults = countyUnionData.data.result;
      unionResults.unions.map((union: any) =>
        countyUnionsInfo.push({ value: union.countyId, label: union.unionTitle }),
      );
    }
    setCountyUnion(countyUnionsInfo);
  }, [countyUnionData, isCountyUnionSuccess]);

  useEffect(() => {
    const useTypesInfo: any = [];
    if (useTypesData && useTypesData?.data) {
      const useTypesResults = useTypesData.data.result;
      useTypesResults.map((useType: any) => useTypesInfo.push({ value: useType.id, label: useType.title }));
    }
    setUseTypes(useTypesInfo);
  }, [useTypesData, isUseTypesSuccess]);

  const handleuserSearch = (nationalCode: string, setuser: any) => {
    setuser(null);
    if (nationalCode) {
      getUserByNationalCode.mutate(nationalCode, {
        onSuccess: (data: any) => {
          console.log(data, 'datauser');

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

  const handleSelectedRoleChanges = (roles: any, setFieldValue: any) => {
    setFieldValue('rolesToChange', roles);
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
        refetchUseTypes();
      }
      if (
        baseChange.value === BaseChangesEnum.MainLocationDivision &&
        requesterRole.label === UserRoles.CountyGuildRoomAdmin
      ) {
        countyRefetch();
      } else {
        countyUnionRefetch();
      }
    });
  };

  const handleSelectedCounty = (county: any, setFieldValue: any) => {
    setFieldValue('county', county);
    if (county.value) {
      getCityOrRural.mutate([county.value], {
        onSuccess: (data: any) => {
          const result = data?.data.result;
          if (result) {
            const cityOrRural: any = [];
            result.map((item: any) => cityOrRural.push({ value: item.id, label: item.title }));
            setCityOrRural(cityOrRural);
          }
        },
        onError: (error: any) => {
          console.error('Error:', error);
        },
      });
    }
  };

  const handleSelectedUseTypes = (useTypes: any, setFieldValue: any) => {
    setFieldValue('useTypes', useTypes);
    if (useTypes.length > 0) {
      const selectedUseTypeIds: any = [];
      useTypes.map((useType: any) => selectedUseTypeIds.push(useType.value));
      getAllJobs.mutate(selectedUseTypeIds, {
        onSuccess: (data: any) => {
          const jobsInfo: any = [];
          if (data && data.data) {
            const jobsResult = data.data.result;
            jobsResult.map((job: any) => jobsInfo.push({ value: job.id, label: job.title }));
          }
          setJobs(jobsInfo);
        },
      });
    }
  };

  const handleSubmit = (values: any) => {
    console.log(values, 'values');
    console.log(requesterRole.value, ' requesterRole.value');

    const formData: any = new FormData();

    if (!values.file || !(values.file.length > 0)) {
      showToast(['لطفا فایل را انتخاب کنید!'], ToastTypes.error);
      return;
    }

    if (values.file) {
      for (let file of values.file) {
        formData.append(`File`, file);
      }
    }

    formData.append(
      'BaseChangesTypes',
      values.baseChanges.map((change: any) => change.value),
    );
    formData.append(
      'RolesToChange',
      values.rolesToChange.map((role: any) => role.value),
    );
    formData.append('RequesterRole', requesterRole.value);
    formData.append('CurrentUserInfoId', currentUser.id);
    values.province && formData.append('ProvinceId', values.province);
    values.county && formData.append('CountyId', values.county.value);

    values.cityOrVillage && formData.append('CityOrVillageId', values.cityOrVillage.value);
    values.countyUnion && formData.append('CountyUnionId', values.countyUnion.value);
    formData.append('IsSelectAllUseType', false);
    formData.append('IsSelectAllJob', false);
    values.useTypes.length > 0 &&
      values.useTypes.forEach((type: any, index: any) => formData.append(`UseTypeIds[${index}]`, type.value));
    values.jobs.length > 0 &&
      values.jobs.forEach((job: any, index: any) => formData.append(`JobIds[${index}]`, job.value));
    values.licenseRequest && formData.append('LicenseRequestId', parseInt(values.licenseRequest));
    formData.append('ChangesReasonsEnum', values.changesReasons ? values.changesReasons.value : null);
    formData.append('Description', values.description);
    formData.append('FileLicenseNumber', values.fileLicenseNumber);
    formData.append('FileLicenseDate', values.fileLicenseDate);
    formData.append('FileDescription', values.fileDescription);

    changeUserRequest.mutate(formData, {
      onSuccess: (data) => {
        console.log(data, 'data_mute');
        showToast(['اطلاعات با موفقیت ثبت شد'], ToastTypes.success);
      },

      onError: (error: any) => {
        showToast(['در ثبت اطلاعات مشکلی به وجود آمده است'], ToastTypes.error);
      },
    });
  };

  return (
    <FormDivider textHeader="">
      <Formik
        initialValues={initialvalues}
        validationSchema={UserSchema}
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
                <MultiSelectOption
                  options={RoleData}
                  name="rolesToChange"
                  hasLabel
                  labelText="نقش"
                  placeHolder="لطفا نقش را وارد نمایید"
                  significant
                  onChange={(roles: any) => {
                    handleSelectedRoleChanges(roles, setFieldValue);
                  }}
                />
                <MultiSelectOption
                  options={baseChangesOptions}
                  name="baseChanges"
                  hasLabel
                  labelText="مبنای تغییرات"
                  placeHolder="یک گزینه را انتخاب نمایید"
                  significant
                  isLoading={isCountyLoading}
                  onChange={(baseChanges) => {
                    handleSelectedbaseChanges(baseChanges, setFieldValue);
                  }}
                />
              </TwoColumn>
            </div>

            {values.baseChanges &&
              values.baseChanges.length > 0 &&
              values.baseChanges.map((baseChange: any) =>
                baseChange.value === BaseChangesEnum.LicenseRequest ? (
                  <TwoColumn>
                    <TextInput
                      name="licenseRequest"
                      value={values.licenseRequest}
                      placeholder="شناسه درخواست"
                      lableText="شناسه درخواست"
                      significant
                    />
                  </TwoColumn>
                ) : (
                  (baseChange.value === BaseChangesEnum.MainLocationDivision && (
                    <>
                      {requesterRole.label === UserRoles.CountyGuildRoomAdmin ? (
                        <TwoColumn>
                          <BasicSelectOption
                            name="county"
                            data={countyRoom}
                            placeHolder="یک گزینه انتخاب نمایید"
                            lableText="شهرستان"
                            onChange={(county) => {
                              handleSelectedCounty(county, setFieldValue);
                            }}
                          />
                          <BasicSelectOption
                            name="cityOrVillage"
                            data={cityOrRural}
                            placeHolder="یک گزینه انتخاب نمایید"
                            lableText="شهر/روستا"
                          />
                        </TwoColumn>
                      ) : requesterRole.label === UserRoles.UnionAdmin ? (
                        <TwoColumn>
                          <BasicSelectOption
                            name="countyUnion"
                            data={countyUnion}
                            placeHolder="یک گزینه انتخاب نمایید"
                            lableText="اتحادیه"
                          />
                        </TwoColumn>
                      ) : null}
                    </>
                  )) ||
                  (baseChange.value === BaseChangesEnum.UseType && (
                    <>
                      <TwoColumn>
                        <MultiSelectOption
                          name="useTypes"
                          options={useTypes}
                          placeHolder="یک گزینه انتخاب نمایید"
                          significant
                          hasLabel
                          labelText="نوع کاربری"
                          onChange={(useTypes: any) => {
                            handleSelectedUseTypes(useTypes, setFieldValue);
                          }}
                        />
                        <MultiSelectOption
                          name="jobs"
                          options={jobs}
                          placeHolder="یک گزینه انتخاب نمایید"
                          hasLabel
                          labelText="شغل"
                          significant
                        />
                      </TwoColumn>
                    </>
                  ))
                ),
              )}

            <>
              <BasicSelectOption
                data={ChangesReasonsData}
                name="changesReasons"
                lableText="ادله ی تغییرات"
                placeHolder="یک گزینه را انتخاب نمایید"
                significant
              />
          <TwoColumn>
                <TextInput
                  name="fileLicenseNumber"
                  value={values.fileLicenseNumber}
                  placeholder="شماره مجوز فایل"
                  lableText="شماره مجوز فایل"
                  significant
                />

                <ModernDatePicker
                  name="fileLicenseDate"
                  lableText="تاریخ مجوز فایل"
                  placeholder="تاریخ مجوز فایل"
                  hasMaximum={false}
                  initialValue={values.fileLicenseDate}
                />
              </TwoColumn>
              <DropZone lableText="انتخاب فایل" name="file" significant isSingle />
              <TextInput
                name="fileDescription"
                value={values.fileDescription}
                placeholder="توضیحات فایل"
                lableText="توضیحات فایل"
                significant
              /> 
        
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
