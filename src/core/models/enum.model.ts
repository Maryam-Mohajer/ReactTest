export interface EnumModel {
  description: string;
  level?: 'county' | 'union' | 'Expert';
}

export type EnumRecord<K extends string | number | symbol, T extends EnumModel> = Record<K, T>;
