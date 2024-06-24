import { BasicChanges, BasicChangesInfo } from 'core/enums/basic-changes.enum';
import { getNumericEnumValues } from 'core/utils/get-numeric-enum-values.utils';

const numericValues = getNumericEnumValues(BasicChanges);
export const BasicChangesData = [
  {
    label: 'یک گزینه را انتخاب کنید',
    options: numericValues.map((value: BasicChanges) => ({
      value,
      label: BasicChangesInfo[value].description,
    })),
  },
];
