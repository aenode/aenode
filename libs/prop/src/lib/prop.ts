import { ApiProperty, type ApiPropertyOptions } from '@aenode/nest/swagger';

export function Prop(options?: ApiPropertyOptions): PropertyDecorator {
  return (...args) => {
    ApiProperty(options)(...args);
  };
}
