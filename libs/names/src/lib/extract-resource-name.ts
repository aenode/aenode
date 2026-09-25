export const RESOURCE_NAME_SUFFIX_EXP =
  /(Controller|Service|Resolver|EventEmitter|Interceptor|Middleware|Module)$/;

export function extractResourceName(name: string) {
  return name.replace(RESOURCE_NAME_SUFFIX_EXP, '');
}
