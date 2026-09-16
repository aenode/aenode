import { Prop } from '../decorators/index.js';

export class InputValiationErrorDto {
  @Prop({ description: 'Property name' }) property?: string;
  @Prop({ description: 'Contaraint name' }) constraint?: string;
  @Prop({ description: 'Property name' }) message: string;

  constructor(value?: InputValiationErrorDto) {
    if (value) {
      Object.assign(this, value);
    }
  }
}
