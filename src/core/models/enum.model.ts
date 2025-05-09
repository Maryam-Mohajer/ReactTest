export interface EnumModel {
  description: string;
  label?:string;
  level?: string;
}

export type EnumRecord<K extends string | number | symbol, T extends EnumModel> = Record<K, T>;
