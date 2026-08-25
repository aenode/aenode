import { type ClassTransformOptions } from 'class-transformer';
export const globalClassTransformOptions: ClassTransformOptions = {
  exposeDefaultValues: true,
  excludeExtraneousValues: true,
  exposeUnsetFields: false,
};
