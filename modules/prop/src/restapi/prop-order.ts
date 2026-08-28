import { PropValidation } from '@aenode/prop-validation';
import { ApiProperty } from '@nestjs/swagger';

export function PropOrder(): PropertyDecorator {
  return (...args) => {
    PropValidation({ isIn: ['asc', 'desc'] })(...args);
    ApiProperty({ enum: ['asc', 'desc'], required: false, nullable: true })(
      ...args,
    );
  };
}
