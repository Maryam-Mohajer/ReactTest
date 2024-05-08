export interface EnumModel {
  description: string;
}

export type EnumRecord<K extends string | number | symbol, T extends EnumModel> = Record<
  K,
  T
>;
