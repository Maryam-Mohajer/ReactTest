import { GradeValue } from 'core/enums/grade.enum';
import * as Yup from 'yup';
const phoneRegExp = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

const UserSchema = Yup.object().shape({
  name: Yup.string().required('لطفا نام خود را وارد نمایید'),
  lastName: Yup.string().required('لطفا نام خانوادگی خود را وارد نمایید').typeError('پر نمودن این فیلد الزامی است'),
  fathername: Yup.string().required('لطفا نام پدر خود را وارد نمایید').typeError('پر نمودن این فیلد الزامی است'),
  phoneNumber: Yup.string()
    .required('لطفا شماره موبایل را وارد نمایید')
    .matches(phoneRegExp, 'شماره موبایل معتبر نیست')
    .typeError('پر نمودن این فیلد الزامی است'),

  grade: Yup.object().shape({
    value: Yup.number().required('پر نمودن این فیلد الزامی است'),
    label: Yup.string().required('لطفا یک گزینه انتخاب نمایید.'),
  }),
  university: Yup.array().when('grade.value', {
    is: (value: number) => [GradeValue.Masters, GradeValue.Senior, GradeValue.Doctorate].includes(value),
    then: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number().required('پر نمودن این فیلد الزامی است'),
          label: Yup.string().required('حداقل یک گزینه انتخاب نمایید'),
        }),
      )
      .min(1, 'حداقل یک گزینه انتخاب کنید'),
    otherwise: Yup.array(),
  }),
});
export const UsersValidate = Yup.object().shape({
  users: Yup.array().of(UserSchema),
});
