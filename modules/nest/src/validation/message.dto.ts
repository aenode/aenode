import { Prop } from '../decorators/index.js';

export class MessageDto {
  @Prop({ description: 'Error message' }) message: string;

  constructor(value?: MessageDto) {
    if (value) {
      Object.assign(this, value);
    }
  }
}
