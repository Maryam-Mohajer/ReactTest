import { EnumModel, EnumRecord } from "../models/enum.model";

export enum UserTypeEnum {
  Undefined = 0,
  Real = 1,
  Legal = 2
}

export const UserTypeEnumInfos: EnumRecord<UserTypeEnum, EnumModel> = {
  [UserTypeEnum.Undefined]: { description: 'نامشخص' },
  [UserTypeEnum.Real]: { description: 'حقیقی' },
  [UserTypeEnum.Legal]: { description: 'حقوقی' }
}
