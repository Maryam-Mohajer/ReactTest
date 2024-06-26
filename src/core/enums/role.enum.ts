import { EnumModel, EnumRecord } from 'core/models/enum.model';

export enum RoleEnum {
  CountyGuildRoomAdmin = 1008,
  UnionAdmin = 1011,
  UnionManager = 4,
  UnionIssuingResponsible = 6,
  UnionSecretariat = 7,
  UnionExpert = 8,
  CountySecretariat = 15,
}

export const RoleEnumInfos: EnumRecord<RoleEnum, EnumModel> = {
  [RoleEnum.CountyGuildRoomAdmin]: { description: 'ادمین شهرستان', level: 'county' },
  [RoleEnum.UnionAdmin]: { description: 'ادمین اتحادیه', level: 'union' },
  [RoleEnum.UnionManager]: { description: 'مدیر اتحادیه', level: 'union' },
  [RoleEnum.UnionIssuingResponsible]: { description: 'مسول صدور', level: 'union' },
  [RoleEnum.UnionExpert]: { description: 'کارشناس', level: 'Expert' },
  [RoleEnum.CountySecretariat]: { description: 'دبیرخانه شهرستان', level: 'county' },
  [RoleEnum.UnionSecretariat]: { description: 'دبیرخانه اتحادیه', level: 'union' },
};
