import { Prop } from '../decorators/index.js';

export class BaseQueryDto {
  @Prop({ min: 1, default: 20 }) take: number;
  @Prop({ min: 0, default: 0 }) skip: number;
  @Prop({ description: 'Search string' }) search?: string;
}
