import { UserRoles } from 'core/enums';
import { BaseChangesEnum } from 'core/enums/basic-changes.enum';
import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
  currentNationalCode: Yup.string().required('لطفا کد ملی کاربر را وارد نمایید'),
  newNationalCode: Yup.string()
    .required('لطفا کد ملی کاربر جدید را وارد نمایید')
    .typeError('پر نمودن این فیلد الزامی است'),
  rolesToChange: Yup.array()
    .of(
      Yup.object()
        .shape({ value: Yup.number(), label: Yup.string().nullable(), level: Yup.string() })
        .required('پر نمودن این فیلد الزامی است'),
    )
    .test('rolesToChange', 'فقط نقش های هم سطح را می توانید انتخاب کنید', function (roles) {
      if (!roles || roles.length === 0) {
        return true;
      }
      const levels = roles.map((role: any) => role.level);
      return levels.every((level: any) => level === levels[0]);
    })
    .typeError('پر نمودن این فیلد الزامی است'),

  baseChanges: Yup.array()
    .of(Yup.object().shape({ value: Yup.number(), label: Yup.string().nullable(), level: Yup.string() }))
    .test('baseChanges', 'فقط مبناهای هم سطح را می توانید انتخاب کنید', function (bases) {
      if (!bases || bases.length === 0) {
        return true;
      }
      const levels = bases.map((base: any) => base.level);
      return levels.every((level: any) => level === levels[0]);
    })
    .required('پر نمودن این فیلد الزامی است')
    .typeError('پر نمودن این فیلد الزامی است'),

  licenseRequest: Yup.string().when('baseChanges', {
    is: (baseChanges: any) =>
      baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.LicenseRequest),
    then: Yup.string().required('پر نمودن این فیلد الزامی است'),
  }),

  useTypes: Yup.array().of(
    Yup.object().when('baseChanges', {
      is: (baseChanges: any) => baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.UseType),
      then: Yup.object().shape({ value: Yup.number().required('پر نمودن این فیلد الزامی است'), label: Yup.string() }),
    }),
  ),
  jobs: Yup.array().of(
    Yup.object().when('baseChanges', {
      is: (baseChanges: any) => baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.UseType),
      then: Yup.object().shape({ value: Yup.number().required('پر نمودن این فیلد الزامی است'), label: Yup.string() }),
    }),
  ),
  // province: Yup.string(),
  county: Yup.object().when('baseChanges', {
    is: (baseChanges: any) =>
      baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.MainLocationDivision),
    then: Yup.object().shape({ value: Yup.number().required('پر نمودن این فیلد الزامی است'), label: Yup.string() }),
  }),

  cityOrVillage: Yup.object().when('baseChanges', {
    is: (baseChanges: any) =>
      baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.MainLocationDivision),
    then: Yup.object().shape({
      value: Yup.number().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
      label: Yup.string(),
    }),
  }),

  countyUnion: Yup.object().when('requesterRole', {
    is: (requesterRole: any) => requesterRole === UserRoles.UnionAdmin,
    then: Yup.object().shape({ value: Yup.number().required('پر نمودن این فیلد الزامی است'), label: Yup.string() }),
  }),

  changesReasons: Yup.object()
    .shape({ value: Yup.number(), label: Yup.string() })
    .required('پر نمودن این فیلد الزامی است')
    .typeError('پر نمودن این فیلد الزامی است'),
  fileLicenseNumber: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  fileLicenseDate: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  fileDescription: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  file: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  description: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
});
// 'مبناهای انتخاب شده صحیح نیست مبنای شناسه درخواست متفاوت می باشد'
