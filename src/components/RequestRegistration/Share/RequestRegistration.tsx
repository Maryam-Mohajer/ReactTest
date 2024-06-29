import {
  DropZone,
  FileInput,
  FormDivider,
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

interface Props {
  requesterRole: string;
}
const RequestRegistration = ({ requesterRole }: Props) => {
  const changeUserRequest = useSetChangeUserRequestForOthers();
  const getUserByNationalCode = useGetUserByNationalCode();
  const {
    data: countyData,
    isLoading: isCountyLoading,
    isSuccess,
    refetch,
  } = useGetOwnedUserCountyGuildRoomsForAdmin();
  const getCityOrRural = useGetAllCityOrRuralTitles();

  const [initialvalues, setinitialvalues] = useState({
    currentNationalCode: '',
    newNationalCode: '',
    rolesToChange: null,
    baseChanges: [],
    licenseRequest: '',
    UseType: [],
    Job: [],
    County: '',
    CityOrVillage: '',
    CountyUnionId: '',
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

  useEffect(() => {
    if (countyData && countyData?.data) {
      const results = countyData.data.result;
      const counties: any = [];
      results.map((result: any) => counties.push({ value: result.id, label: result.countyTitle }));
      setCountyRoom(counties);
    }
  }, [countyData, isSuccess]);

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
        onError: (err) => {
          console.log(err, 'ee');
        },
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

  const handleSelectedbaseChanges = (roles: any, setFieldValue: any) => {
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

  const handleSubmit = () => {};

  return (
    <FormDivider textHeader="">
      <Formik
        initialValues={initialvalues}
        validationSchema={UserSchema}
        onSubmit={() => {
          handleSubmit();
        }}
        enableReinitialize={true}
      >
        {({ values, handleChange, setFieldValue }) => (
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
                    handleSelectedbaseChanges(roles, setFieldValue);
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
                    setFieldValue('baseChanges', baseChanges);
                    baseChanges.map((baseChange: any) => {
                      baseChange.value === BaseChangesEnum.MainLocationDivision && refetch();
                    });
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
                      {requesterRole === UserRoles.CountyGuildRoomAdmin ? (
                        <TreeColumn>
                          <BasicSelectOption
                            name="County"
                            data={countyRoom}
                            placeHolder="یک گزینه انتخاب نمایید"
                            lableText="شهرستان"
                            onChange={(County) => {
                              setFieldValue('County', County);
                              if (County.value) {
                                getCityOrRural.mutate([County.value], {
                                  onSuccess: (data: any, val: any) => {
                                    const result = data?.data.result;
                                    if (result) {
                                      const cityOrRural: any = [];
                                      result.map((result: any) =>
                                        cityOrRural.push({ value: result.id, label: result.title }),
                                      );
                                      setCityOrRural(cityOrRural);
                                    }
                                  },
                                  onError: (error: any) => {
                                    console.error('Error:', error);
                                  },
                                });
                              }
                            }}
                          />
                          <BasicSelectOption
                            name="CityOrVillage"
                            data={cityOrRural}
                            placeHolder="یک گزینه انتخاب نمایید"
                            lableText="شهر"
                          />
                          <BasicSelectOption
                            name="CityOrVillage"
                            data={[]}
                            placeHolder="یک گزینه انتخاب نمایید"
                            lableText="روستا"
                          />
                        </TreeColumn>
                      ) : requesterRole === UserRoles.UnionAdmin ? (
                        <TwoColumn>
                          <BasicSelectOption
                            name="CountyUnionId"
                            data={[]}
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
                        <BasicSelectOption
                          name="UseType"
                          data={[]}
                          placeHolder="یک گزینه انتخاب نمایید"
                          lableText="نوع کاربری"
                        />
                        <BasicSelectOption name="Job" data={[]} placeHolder="یک گزینه انتخاب نمایید" lableText="شغل" />
                      </TwoColumn>
                    </>
                  ))
                ),
              )}

            <>
              <Row>
                <Col>
                  <MultiSelectOption
                    options={ChangesReasonsData}
                    name="changesReasons"
                    hasLabel
                    labelText="ادله ی تغییرات"
                    placeHolder="یک گزینه را انتخاب نمایید"
                    significant
                  />
                </Col>
                <Col>
                  <div style={{ marginTop: '1rem' }}>
                    <FileInput
                      files={[]}
                      name="file"
                      outLine
                      isSingle
                      inputText="بارگذاری اسناد"
                      setFieldValue={(val: any) => {
                        setFieldValue('file', val);
                      }}
                    />
                  </div>
                </Col>
              </Row>

              <TextArea
                lableText="توضیحات"
                name="description"
                placeholder="توضیحات"
                significant
                value={values.description}
              />
            </>

            <SubmitButton isLoading={false} />
          </Form>
        )}
      </Formik>
    </FormDivider>
  );
};

export default RequestRegistration;
