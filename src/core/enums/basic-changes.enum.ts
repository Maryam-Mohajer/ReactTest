import { EnumModel, EnumRecord } from 'core/models/enum.model';
export enum BaseChangesEnum {
  UseType = 1,
  MainLocationDivision = 2,
  LicenseRequest = 3,
}
export const BaseChangesInfo: EnumRecord<BaseChangesEnum, EnumModel> = {
  [BaseChangesEnum.UseType]: { description: 'نوع کاربری', level: '1' },
  [BaseChangesEnum.MainLocationDivision]: { description: 'تقسیمات کشوری', level: '1' },
  [BaseChangesEnum.LicenseRequest]: { description: 'شناسه درخواست', level: '2' },
};
