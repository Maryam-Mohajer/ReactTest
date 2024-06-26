import { RoleEnum, RoleEnumInfos } from '../enums/role.enum';
import * as Yup from 'yup';

const UserSchema = Yup.object().shape({
  currentNationalCode: Yup.string().required('لطفا کد ملی کاربر را وارد نمایید'),
  newNationalCode: Yup.string()
    .required('لطفا کد ملی کاربر جدید را وارد نمایید')
    .typeError('پر نمودن این فیلد الزامی است'),
  rolesToChange: Yup.array().of(Yup.mixed<RoleEnum>().required()),
});
export const UsersValidate = Yup.object().shape({
  users: Yup.array().of(UserSchema),
});
