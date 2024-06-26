import { EnumModel, EnumRecord } from 'core/models/enum.model';
export enum BaseChangesTypeEnum {
  UseType = 1,
  MainLocationDivision = 2,
  LicenseRequest = 3,
}
export const BaseChangesInfo: EnumRecord<BaseChangesTypeEnum, EnumModel> = {
  [BaseChangesTypeEnum.UseType]: { description: 'نوع کاربری' },
  [BaseChangesTypeEnum.MainLocationDivision]: { description: 'تقسیمات کشوری' },
  [BaseChangesTypeEnum.LicenseRequest]: { description: 'شناسه درخواست' },
};
