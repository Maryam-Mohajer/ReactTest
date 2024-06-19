import { FormDivider, MultiSelectOption, SubmitButton, TextInput } from 'components/common/Form';
import BasicSelectOption from 'components/common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import TreeColumn from 'components/common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn';
import { GradeData } from 'core/data/gradeData.data';
import { UniversityData } from 'core/data/university.data';
import { GradeValue } from 'core/enums/grade.enum';
import { UsersValidate } from 'core/validations/Users-validation';
import { Form, Formik, FieldArray, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { X } from 'react-feather';
import styled from './AddUser.module.scss';
import { Button } from 'reactstrap';
import { EducatedProps, GroupedUserInfo, UserInfo } from '../UserManagement';

interface Props {
  tableData: GroupedUserInfo[];
  initialvalues: GroupedUserInfo;
  isInEditMode: boolean;
  setIsInEditMode: (value: boolean) => void;
  setTableData: (values: GroupedUserInfo[]) => void;
  setInitialvalues: (values: GroupedUserInfo) => void;
}

const AddUsers = ({
  tableData,
  initialvalues,
  isInEditMode,
  setIsInEditMode,
  setInitialvalues,
  setTableData,
}: Props) => {
  const [selectedGrades, setSelectedGrades] = useState<EducatedProps[]>([]);

  const handleSelectedGrade = (grade: EducatedProps, index: number, setFieldValue: any) => {
    // if (selectedGrades.length === 0) {
    //   setSelectedGrades([...selectedGrades, grade]);
    // } else {
    //   const existGrade = selectedGrades.find((grd) => grade.value === grd.value);
    //   console.log(existGrade, 'existGrade');
    //   !existGrade && setSelectedGrades([...selectedGrades, grade]);
    // }
    const newSelectedGrades = [...selectedGrades];
    newSelectedGrades[index] = grade;
    setSelectedGrades(newSelectedGrades);
    setFieldValue(`users[${index}].grade`, grade);
  };

  const filterOptions = (index: number) => {
    const currentSelection = selectedGrades[index];
    return GradeData[0].options.filter((option) => !selectedGrades.includes(option) || option === currentSelection);
  };

  const onSubmit = (values: GroupedUserInfo, { resetForm }: FormikHelpers<GroupedUserInfo>) => {
    const newUsers: UserInfo[] = [];
    const universityArray: EducatedProps[] = [];
    values.users &&
      values.users.length &&
      values.users.forEach((user: UserInfo, index: number) =>
        newUsers.push({
          id: index + 1,
          name: user.name,
          lastName: user.lastName,
          fathername: user.fathername,
          phoneNumber: user.phoneNumber,
          grade: user.grade ? { value: user.grade.value, label: user.grade.label } : { value: 0, label: '' },
          university:
            user.grade && user.grade.value !== GradeValue.Diplom
              ? user.university.filter((item: EducatedProps) => universityArray.push(item))
              : [],
        }),
      );
    if (isInEditMode) {
      setTableData(
        tableData.map((usersGroup: GroupedUserInfo) =>
          usersGroup.groupId === values.groupId ? { ...usersGroup, users: newUsers } : usersGroup,
        ),
      );
      setInitialvalues({
        users: [
          {
            id: 0,
            name: '',
            lastName: '',
            fathername: '',
            phoneNumber: '',
            grade: { value: 0, label: '' },
            university: [],
          },
        ],
      });
      setIsInEditMode(false);
    } else {
      const updatedUsers: GroupedUserInfo = { groupId: tableData.length + 1, users: newUsers };
      setTableData([...tableData, updatedUsers]);
      resetForm();
    }
  };

  return (
    <>
      <FormDivider textHeader="" classNames={styled.container}>
        <Formik
          initialValues={initialvalues}
          onSubmit={(values, resetForm) => onSubmit(values, resetForm)}
          validationSchema={UsersValidate}
          enableReinitialize={true}
        >
          {({ values, resetForm, setFieldValue }) => (
            <>
              <Form>
                <FieldArray
                  name="users"
                  render={(arrayHelpers) => (
                    <div>
                      {values.users && values.users.length > 0
                        ? values.users.map((user: UserInfo, index: number) => (
                            <div className={styled.container}>
                              <FormDivider textHeader="" key={index} classNames={styled.internalContainer}>
                                <div className={styled['btn-close']} onClick={() => arrayHelpers.remove(index)}>
                                  <X size={18} color={'#49b9a6'} />
                                </div>
                                <TreeColumn>
                                  <div>
                                    <TextInput
                                      name={`users[${index}].name`}
                                      value={values.users[index].name}
                                      significant
                                      lableText="نام"
                                      placeholder="نام خود را وارد نمایید"
                                    />
                                    <TextInput
                                      name={`users[${index}].lastName`}
                                      value={values.users[index].lastName}
                                      significant
                                      lableText="نام خانوادگی"
                                      placeholder="نام خانوادگی خود را وارد نمایید"
                                    />
                                  </div>
                                  <div>
                                    <TextInput
                                      name={`users[${index}].fathername`}
                                      value={values.users[index].fathername}
                                      significant
                                      lableText="نام پدر"
                                      placeholder="نام پدر خود را وارد نمایید"
                                    />
                                    <TextInput
                                      name={`users[${index}].phoneNumber`}
                                      value={values.users[index].phoneNumber}
                                      significant
                                      lableText="شماره تلفن"
                                      placeholder="شماره تلفن خود را وارد نمایید"
                                    />
                                  </div>
                                  <div className={styled.selectStyle}>
                                    <BasicSelectOption
                                      name={`users[${index}].grade`}
                                      data={filterOptions(index)}
                                      onChange={(event) => {
                                        handleSelectedGrade(event, index, setFieldValue);
                                      }}
                                      lableText="تحصیلات"
                                      significant
                                      placeHolder="انتخاب کنید.."
                                    />

                                    {values.users[index].grade &&
                                      values.users[index].grade.value > GradeValue.Diplom && (
                                        <MultiSelectOption
                                          name={`users[${index}].university`}
                                          placeHolder="انتخاب کنید.."
                                          options={UniversityData}
                                          significant
                                          labelText="دانشگاه"
                                        />
                                      )}
                                  </div>
                                </TreeColumn>
                              </FormDivider>
                            </div>
                          ))
                        : null}
                      {
                        <Button
                          className={styled['btn-add']}
                          onClick={() => arrayHelpers.insert(arrayHelpers.form.values.users.length, '')}
                          outline
                        >
                          افزودن
                        </Button>
                      }
                    </div>
                  )}
                ></FieldArray>
                <SubmitButton
                  isLoading={false}
                  onClick={() => {}}
                  color="#49b9a6"
                  btnText={isInEditMode ? 'ثبت ویرایش' : 'ثبت اطلاعات'}
                  clearable
                  clearableTxt={isInEditMode ? 'لغو ویرایش' : 'پاک کردن فرم'}
                  onClear={() => {
                    isInEditMode
                      ? setInitialvalues({
                          users: [
                            {
                              id: 0,
                              name: '',
                              lastName: '',
                              fathername: '',
                              phoneNumber: '',
                              grade: { value: 0, label: '' },
                              university: [],
                            },
                          ],
                        })
                      : resetForm();
                    setIsInEditMode(false);
                  }}
                />
              </Form>
            </>
          )}
        </Formik>
      </FormDivider>
    </>
  );
};

export default AddUsers;
