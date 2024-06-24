import { EnumModel, EnumRecord } from 'core/models/enum.model';

export enum RoleEnum {
  CountyAdmin = 1,
  UnionAdmin = 2,
  UnionManager = 3,
  IssuerResponsible = 4,
  VisitingExpert = 5,
  CitySecretariat = 6,
  UnionSecretariat = 7,
}

export const RoleEnumInfos: EnumRecord<RoleEnum, EnumModel> = {
  [RoleEnum.CountyAdmin]: { description: 'ادمین شهرستان' },
  [RoleEnum.UnionAdmin]: { description: 'ادمین اتحادیه' },
  [RoleEnum.UnionManager]: { description: 'مدیر اتحادیه' },
  [RoleEnum.IssuerResponsible]: { description: 'مسول صدور' },
  [RoleEnum.VisitingExpert]: { description: 'مسول صدور' },
  [RoleEnum.CitySecretariat]: { description: 'دبیرخانه شهرستان' },
  [RoleEnum.UnionSecretariat]: { description: 'دبیرخانه اتحادیه' },
};
