import { PropValidation } from '../prop.js';
import { Parent } from './parent.js';

export class Child {
  @PropValidation() name?: string;
  @PropValidation() parent?: Parent;
}
