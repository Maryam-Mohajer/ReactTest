import { BaseChangesTypeEnum, BaseChangesInfo } from 'core/enums/basic-changes.enum';
import { getNumericEnumValues } from 'core/utils/get-numeric-enum-values.utils';

const numericValues = getNumericEnumValues(BaseChangesTypeEnum);
export const BasicChangesData = [
  {
    label: 'یک گزینه را انتخاب کنید',
    options: numericValues.map((value: BaseChangesTypeEnum) => ({
      value,
      label: BaseChangesInfo[value].description,
      level: BaseChangesInfo[value].level,
    })),
  },
];
