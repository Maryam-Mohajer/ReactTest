import { FormDivider, MultiSelectOption, TextInput } from 'components/common/Form';
import { InputGroupSearch } from 'components/common/Form/InputComponents/InputGroupSearch/InputGroupSearch';
import { useSetChangeUserRequestForOthers } from '../../../../core/services/api/change-user-request';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { data } from 'jquery';
import { RoleEnum } from 'core/enums/role.enum';
import { RoleData } from 'core/data/RoleData.data';
import { BasicChangesData } from 'core/data/basic-changes.data';

const AddCountyAdmin = () => {
  const changeUserRequest = useSetChangeUserRequestForOthers();

  const [initialvalues, setinitialvalues] = useState({
    currentNationalCode: '',
    newNationalCode: '',
    role: { value: 0, label: ' ' },
    basisChanges: { value: 0, label: ' ' },
  });
  const handleSubmit = () => {};

  return (
    <FormDivider textHeader="">
      <Formik
        initialValues={initialvalues}
        onSubmit={() => {
          handleSubmit();
        }}
      >
        <Form>
          <Row>
            <Col lg="4">
              <InputGroupSearch
                value=""
                name="currentNationalCode"
                handleChange={() => {}}
                placeholder="لطفا کد ملی را وارد نمایید"
                lableText="کد ملی کاربر فعلی"
              />
            </Col>
            <Col lg="4">
              <InputGroupSearch
                value=""
                name="newNationalCode"
                handleChange={() => {}}
                placeholder="لطفا کد ملی را وارد نمایید"
                lableText="کد ملی کاربر فعلی"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <MultiSelectOption options={RoleData} name="role" labelText="نقش" significant />
            </Col>
            <Col lg="4">
              <MultiSelectOption options={BasicChangesData} name="basisChanges" labelText="مبنای تغییرات" significant />
            </Col>
            <Col lg="4">
              <TextInput name="licenseRequest" placeholder="شناسه درخواست" lableText="شناسه درخواست" significant />
            </Col>
          </Row>
          <Row>
            <Col>
              <MultiSelectOption options={BasicChangesData} name="useType" labelText="نوع کاربری" significant />
            </Col>
            <Col>
              <MultiSelectOption options={BasicChangesData} name="job" labelText="شغل" significant />
            </Col>
          </Row>
        </Form>
      </Formik>
    </FormDivider>
  );
};

export default AddCountyAdmin;
