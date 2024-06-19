export enum GradeValue {
  Diplom = 1,
  Masters = 2,
  Senior = 3,
  Doctorate = 4,
}

export const GradeLabel = {
  [GradeValue.Diplom]: 'دیپلم',
  [GradeValue.Masters]: 'کارشناسی',
  [GradeValue.Senior]: 'ارشد',
  [GradeValue.Doctorate]: 'دکتری',
};
