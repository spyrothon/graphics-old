import camelcaseKeys from "camelcase-keys";

export function camelizeJSON<T>(json: object): T {
  return (camelcaseKeys(json, { deep: true }) as unknown) as T;
}
