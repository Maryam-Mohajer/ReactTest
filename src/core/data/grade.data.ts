import { GradeEnum, GradeLabel } from '../enums/grade.enum';

export const GradeData = [
  {
    label: '..انتخاب کنید',
    options: [
      { value: GradeEnum.Diplom, label: GradeLabel[GradeEnum.Diplom] },
      {
        value: GradeEnum.Masters,
        label: GradeLabel[GradeEnum.Masters],
      },
    ],
  },
];
