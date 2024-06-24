import { EnumModel, EnumRecord } from 'core/models/enum.model';
export enum ChangesReasonsEnum {
  EndOfContact = 1,
  CommittingViolations = 2,
  LackOfResponsibility = 3,
  BasedOnUserRequest = 4,
}
export const ChangesReasonsInfo: EnumRecord<ChangesReasonsEnum, EnumModel> = {
  [ChangesReasonsEnum.EndOfContact]: { description: 'پایان قرارداد' },
  [ChangesReasonsEnum.CommittingViolations]: { description: 'ارتکاب به تخلف' },
  [ChangesReasonsEnum.LackOfResponsibility]: { description: 'عدم مسئولیت پذیری' },
  [ChangesReasonsEnum.BasedOnUserRequest]: { description: 'بر اساس درخواست کاربر' },
};
