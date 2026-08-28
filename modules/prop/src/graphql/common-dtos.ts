import { InputType } from './input-type.js';
import { PropOrder } from './prop-order.js';

@InputType()
export class OrderCountDto {
  @PropOrder() _count: 'asc' | 'desc';
}
