import { BaseChangesEnum, BaseChangesInfo } from 'core/enums/basic-changes.enum';
import { getNumericEnumValues } from 'core/utils/get-numeric-enum-values.utils';

const numericValues = getNumericEnumValues(BaseChangesEnum);
export const BasicChangesData = [
  {
    label: 'یک گزینه را انتخاب کنید',
    options: numericValues.map((value: BaseChangesEnum) => ({
      value,
      label: BaseChangesInfo[value].description,
      level: BaseChangesInfo[value].level,
    })),
  },
];
