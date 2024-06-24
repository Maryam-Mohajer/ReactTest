import { EnumModel, EnumRecord } from 'core/models/enum.model';
export enum BasicChanges {
  UseType = 1,
  MainLocationDivision = 2,
  LicenseRequest = 3,
}
export const BasicChangesInfo: EnumRecord<BasicChanges, EnumModel> = {
  [BasicChanges.UseType]: { description: 'نوع کاربری' },
  [BasicChanges.MainLocationDivision]: { description: 'تقسیمات کشوری' },
  [BasicChanges.LicenseRequest]: { description: 'شناسه درخواست' },
};
