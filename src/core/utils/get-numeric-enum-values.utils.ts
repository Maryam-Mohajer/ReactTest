export function getNumericEnumValues(enumObj: any): number[] {
  return Object.values(enumObj).filter((value) => typeof value === 'number') as number[];
}
