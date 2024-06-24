import { RoleEnum, RoleEnumInfos } from '../enums/role.enum';
import { getNumericEnumValues } from 'core/utils/get-numeric-enum-values.utils';

const numericValues = getNumericEnumValues(RoleEnum);

export const RoleData = [
  {
    label: 'یک گزینه را انتخاب کنید',
    options: numericValues.map((value: RoleEnum) => ({
      value,
      label: RoleEnumInfos[value].description,
    })),
  },
];
