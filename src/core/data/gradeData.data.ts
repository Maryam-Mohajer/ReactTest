import { GradeLabel, GradeValue } from 'core/enums/grade.enum';

export const GradeData = [{
  label: 'انتخاب کنید..',
  options: [
    { value: GradeValue.Diplom, label: GradeLabel[GradeValue.Diplom] },
    { value: GradeValue.Masters, label: GradeLabel[GradeValue.Masters] },
    { value: GradeValue.Senior, label: GradeLabel[GradeValue.Senior] },
    { value: GradeValue.Doctorate, label: GradeLabel[GradeValue.Doctorate] },
  ],
}];
