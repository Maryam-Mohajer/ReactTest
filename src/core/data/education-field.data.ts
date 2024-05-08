import { EducationFiledNum, EducationFiledNumInfos } from "core/enums/education-field.enum";
import { getNumericEnumValues } from "core/utils/get-numeric-enum-values.utils";

const numericValues = getNumericEnumValues(EducationFiledNum);

export const EducationFiledData = [
  {
    label: "یک گزینه را انتخاب کنید",
    options: numericValues.map((value: EducationFiledNum) => ({
      value,
      label: EducationFiledNumInfos[value].description,
    })),
  },
];
