import { EnumModel, EnumRecord } from "../models/enum.model";

export enum SupportFileTypeEnum {
  Image = 1,
}

export const SupportFileTypeInfos: EnumRecord<SupportFileTypeEnum, EnumModel> = {
  [SupportFileTypeEnum.Image]: { description: "تصویر" },
};
