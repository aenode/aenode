import { Prop } from '../decorators/index.js';

export class InputValiationErrorDto {
  @Prop({ description: 'Property name', example: 'username' })
  property?: string;

  @Prop({ description: 'Contaraint name', example: 'isEmail' })
  constraint?: string;

  @Prop({
    description: 'Property name',
    example: 'Username must be a valid email',
  })
  message: string;
}
