import { Prop } from '../prop.js';

export class ValidationErrorDto {
  @Prop({ example: 'name' }) property: string;
  @Prop({ example: 'minLength' }) constraint: string;
  @Prop({ example: 'name must be longer than or equal to 3 characters.' })
  message: string;

  constructor(value: ValidationErrorDto) {
    Object.assign(this, value);
  }
}

export class ValidationErrorResponseDto {
  @Prop({
    type: () => ValidationErrorDto,
    isArray: true,
    example: [
      new ValidationErrorDto({
        property: 'name',
        constraint: 'minLength',
        message: 'name must be longer than or equal to 3 characters',
      }),
    ],
  })
  errors: ValidationErrorDto[];
}
