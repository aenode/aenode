import type {
  ObjectValidationOptions,
  PropValidationOptions,
} from '@aenode/prop';
import type { ApiPropertyOptions } from '@nestjs/swagger';

export type PropObjectOptions = ObjectValidationOptions &
  Required<Pick<ObjectValidationOptions, 'type'>> &
  Omit<ApiPropertyOptions, 'type' | 'required' | 'nullable' | 'format'>;

export type PropOptions = PropValidationOptions &
  Omit<ApiPropertyOptions, 'type' | 'required' | 'nullable' | 'format'>;
