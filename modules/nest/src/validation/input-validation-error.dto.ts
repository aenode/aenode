import { Prop } from '../decorators/index.js';

export class InputValiationErrorDto {
  @Prop() property = 'propertyName';
  @Prop() constraint = 'constraint';
  @Prop() message = 'Error message';
}
