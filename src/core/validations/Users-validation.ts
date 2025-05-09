import { UserRoles } from 'core/enums';
import { BaseChangesEnum } from 'core/enums/basic-changes.enum';
import { RoleEnum } from 'core/enums/role.enum';
import * as Yup from 'yup';

const selectBaseChanges = (baseChanges: any, enumItem: any) =>
  baseChanges.some((baseChange: any) => baseChange.value === enumItem);

export const UserSchema = (requesterRole: any) =>
  Yup.object().shape({
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

    licenseRequest: Yup.string().when('baseChanges', (baseChanges: any, schema: any) => {
      if (
        baseChanges &&
        baseChanges.length > 0 &&
        requesterRole === RoleEnum.CountyGuildRoomAdmin &&
        baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.LicenseRequest)
      ) {
        return schema.required('لطفا یک گزینه را انتخاب کنید').typeError('لطفا یک گزینه را انتخاب کنید');
      } else {
        return schema.nullable().notRequired();
      }
    }),

    useTypes: Yup.array().of(
      Yup.object().when('baseChanges', (baseChanges: any, schema: any) => {
        if (
          baseChanges &&
          baseChanges.length > 0 &&
          baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.UseType)
        ) {
          return schema.required('لطفا یک گزینه را انتخاب کنید').typeError('لطفا یک گزینه را انتخاب کنید');
        } else {
          return schema.nullable().notRequired();
        }
      }),
    ),
    jobs: Yup.array().of(
      Yup.object()
        .shape({ value: Yup.number(), label: Yup.string() })
        .when('baseChanges', (baseChanges: any, schema: any) => {
          if (
            baseChanges &&
            baseChanges.length > 0 &&
            baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.UseType)
          ) {
            return schema.required('لطفا یک گزینه را انتخاب کنید').typeError('لطفا یک گزینه را انتخاب کنید');
          } else {
            return schema.nullable().notRequired();
          }
        }),
    ),

    county: Yup.object()
      .shape({ value: Yup.number(), label: Yup.string() })
      .when('baseChanges', (baseChanges: any, schema: any) => {
        if (
          baseChanges &&
          baseChanges.length > 0 &&
          requesterRole === RoleEnum.CountyGuildRoomAdmin &&
          baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.MainLocationDivision)
        ) {
          return schema.required('لطفا یک گزینه راانتخاب کنید').typeError('لطفا یک گزینه را انتخاب کنید');
        } else {
          return schema.nullable().notRequired();
        }
      }),

    cityOrVillage: Yup.object()
      .shape({
        value: Yup.number(),
        label: Yup.string(),
      })
      .when('baseChanges', (baseChanges: any, schema: any) => {
        if (
          baseChanges &&
          baseChanges.length > 0 &&
          requesterRole === RoleEnum.CountyGuildRoomAdmin &&
          baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.MainLocationDivision)
        ) {
          return schema.required('لطفا یک گزینه را انتخاب کنید').typeError('لطفا یک گزینه را انتخاب کنید');
        } else {
          return schema.nullable().notRequired();
        }
      }),

    countyUnion: Yup.object()
      .shape({ value: Yup.number(), label: Yup.string() })
      .when(['baseChanges'], (baseChanges: any, schema: any) => {
        if (
          baseChanges &&
          baseChanges?.length > 0 &&
          requesterRole === RoleEnum.UnionAdmin &&
          baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.MainLocationDivision)
        ) {
          return schema.required('لطفا یک گزینه را انتخاب کنید').typeError('لطفا یک گزینه را انتخاب کنید');
        }
        return schema.nullable().notRequired();
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

/******************************************************************** */

// useTypes: Yup.array().of(
//   Yup.object().when('baseChanges', {
//     is: (baseChanges: any) =>
//       baseChanges?.length > 0 &&
//       baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.UseType),
//     then: Yup.object()
//       .shape({ value: Yup.number(), label: Yup.string() })
//       .required('لطفا کد ملی کاربر جدید را وارد نمایید')
//       .typeError('پر نمودن این فیلد الزامی است'),
//   }),
// ),
// jobs: Yup.array().of(
//   Yup.object().when('baseChanges', {
//     is: (baseChanges: any) =>
//       baseChanges?.length > 0 &&
//       baseChanges.some((baseChange: any) => baseChange.value === BaseChangesEnum.UseType),
//     then: Yup.object()
//       .shape({ value: Yup.number(), label: Yup.string() })
//       .required('لطفا کد ملی کاربر جدید را وارد نمایید')
//       .typeError('پر نمودن این فیلد الزامی است'),
//   }),
// ),
