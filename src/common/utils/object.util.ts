// TODO: test with default enum values, only numeric values, only string values, mixed values
export const getValuesOfEnum = <T>(
  enumObject: Record<string, T | string>
): Array<T> =>
  Object.keys(enumObject)
    .filter((key) => Number.isNaN(Number(key)))
    .map((stringKey) => enumObject[stringKey]) as Array<T>;
