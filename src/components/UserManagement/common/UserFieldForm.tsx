import React from 'react';
import styled from './UserFieldForm.module.scss';
import { FormDivider, SubmitButton, TextInput } from 'components/common/Form';
import { UsersValidate } from 'core/validations/Users-validations';
import { Form, Formik, FormikHelpers } from 'formik';
import TreeColumn from 'components/common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn';
import BasicSelectOption from 'components/common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { GradeData } from 'core/data/grade.data';
import { GradeEnum } from 'core/enums/grade.enum';
import { FallBackSpinner } from 'components/common/Spinner/FallBackSpinner/FallbackSpinner';

interface Props {
  textHeader: string;
  initialValues: any;
  addValues?: any;
  submitBtnText?: string;
  clearable: boolean;
  clearableTxt: string;
  onSubmit: (values: any, resetForm?: any) => void;
  onClear: () => void;
  getMutate: any;
  getMutateById?: any;
}
const UserFieldForm = ({
  textHeader,
  initialValues,
  addValues,
  submitBtnText,
  clearable,
  clearableTxt,
  onSubmit,
  onClear,
  getMutate,
  getMutateById,
}: Props) => {
  return (
    <>
      {getMutateById && getMutateById.isLoading ? (
        <FallBackSpinner />
      ) : (
        <FormDivider textHeader={textHeader} classNames={styled.formStyle}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, resetForm) => onSubmit(values, resetForm)}
            validationSchema={UsersValidate}
            enableReinitialize={true}
          >
            {({ values, resetForm }) => (
              <Form>
                <TreeColumn>
                  <div>
                    <TextInput
                      name="name"
                      value={addValues ? addValues.name : values.name}
                      placeholder="لطفا نام خود را وارد نمایید."
                      lableText="نام"
                      type="text"
                    />
                    <TextInput
                      name="lastName"
                      value={addValues ? addValues.lastName : values.lastName}
                      placeholder="لطفا نام خانوادگی خود را وارد نمایید.."
                      lableText="نام خانوادگی"
                      type="text"
                    />
                  </div>
                  <div>
                    <TextInput
                      name="fatherName"
                      value={addValues ? addValues.fatherName : values.fatherName}
                      lableText="نام پدر"
                      placeholder="لطفا نام پدر را وارد نمایید"
                      type="text"
                    />
                    <TextInput
                      name="phoneNumber"
                      value={addValues ? addValues.phoneNumber : values.phoneNumber}
                      lableText="شماره تلفن"
                      type="phoneNumber"
                      placeholder="شماره تلفن .."
                    />
                  </div>
                  <div className={styled.selectFont}>
                    <BasicSelectOption
                      name="grade"
                      data={GradeData}
                      lableText="تحصیلات"
                      placeHolder="انتخاب کنید .. "
                    />
                    {values.grade && values.grade.value === GradeEnum.Masters && (
                      <TextInput
                        name="university"
                        value={addValues ? addValues.university : values.university}
                        placeholder="دانشگاه"
                        lableText="دانشگاه"
                      />
                    )}
                  </div>
                </TreeColumn>
                <SubmitButton
                  isLoading={getMutate.isLoading}
                  color={'#49b9a6'}
                  btnText={submitBtnText}
                  clearable={clearable}
                  clearableTxt={clearableTxt}
                  onClear={() => {
                    resetForm();
                    onClear();
                  }}
                />
              </Form>
            )}
          </Formik>
        </FormDivider>
      )}
    </>
  );
};

export default UserFieldForm;
