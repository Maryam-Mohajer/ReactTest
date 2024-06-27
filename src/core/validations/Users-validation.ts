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
      const levels = roles.map((role) => role.level);
      return levels.every((level) => level === levels[0]);
    })
    .typeError('پر نمودن این فیلد الزامی است'),

  baseChanges: Yup.array()
    .of(
      Yup.object()
        .shape({ value: Yup.number(), label: Yup.string().nullable(), level: Yup.string() })
        .required('پر نمودن این فیلد الزامی است'),
    )
    .test('rolesToChange', 'فقط مبناهای هم سطح را می توانید انتخاب کنید', function (bases) {
      if (!bases || bases.length === 0) {
        return true;
      }
      const levels = bases.map((base: any) => base.level);
      return levels.every((level) => level === levels[0]);
    })
    .typeError('پر نمودن این فیلد الزامی است'),

  licenseRequest: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  UseTypeIds: Yup.array().of(Yup.object().shape({ value: Yup.number(), Label: Yup.string() })),
  JobIds: Yup.array().of(Yup.object().shape({ value: Yup.number(), Label: Yup.string() })),
  CountyId: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  CityOrVillageId: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  CountyUnionId: Yup.string().required('پر نمودن این فیلد الزامی است'),
  changesReasons: Yup.array()
    .of(Yup.object().shape({ value: Yup.number(), Label: Yup.string() }))
    .typeError('پر نمودن این فیلد الزامی است'),
  fileLicenseNumber: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  fileLicenseDate: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  fileDescription: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  file: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
  description: Yup.string().required('پر نمودن این فیلد الزامی است').typeError('پر نمودن این فیلد الزامی است'),
});
// 'مبناهای انتخاب شده صحیح نیست مبنای شناسه درخواست متفاوت می باشد'
