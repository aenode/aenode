import { PropValidation } from '../prop.js';
import { Child } from './child.js';

export class Parent {
  @PropValidation() child?: Child;
  @PropValidation({ type: () => Child }) children?: Child[];
}
