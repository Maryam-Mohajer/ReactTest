import { GradeEnum } from 'core/enums/grade.enum';
import * as Yup from 'yup';

const phoneRegExp = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

export const UsersValidate = Yup.object().shape({
  name: Yup.string().required('لطفا نام را وارد نمایید.'),
  lastName: Yup.string().required('لطفا نام خانوادگی را وارد نمایید'),
  fatherName: Yup.string().required('لطفا نام پدر را وارد نمایید.'),
  phoneNumber: Yup.string().required('لطفا شماره تلفن را وارد نمایید').matches(phoneRegExp, 'شماره تلفن معتبر نیست'),

  grade: Yup.object().shape({
    value: Yup.number().required('پر کردن این فیلد الزامیست !'),
    label: Yup.string().required('پر کردن این فیلد الزامیست !'),
  }),
  university: Yup.string().when('grade.value', {
    is: GradeEnum.Masters,
    then: Yup.string().required('پر کردن این فیلد الزامیست !'),
    otherwise: Yup.string(),
  }),
});
