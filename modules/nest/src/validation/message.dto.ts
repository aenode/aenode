import { Prop } from '../decorators/index.js';

export class MessageDto {
  @Prop({ description: 'Error message', example: 'Error message' })
  message: string;
}
