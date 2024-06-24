import { ChangesReasonsEnum, ChangesReasonsInfo } from 'core/enums/changes-reasons.enum';
import { getNumericEnumValues } from 'core/utils/get-numeric-enum-values.utils';

const numericValues = getNumericEnumValues(ChangesReasonsEnum);
export const ChangesReasonsData = [
  {
    label: 'یک گزینه را انتخاب کنید',
    options: numericValues.map((value: ChangesReasonsEnum) => ({
      value,
      label: ChangesReasonsInfo[value].description,
    })),
  },
];
