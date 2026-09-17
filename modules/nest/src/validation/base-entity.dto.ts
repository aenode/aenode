import { Prop } from '../decorators/index.js';

export class BaseDto {
  @Prop({ description: 'Primary unique id', example: 1 }) id: number;
  @Prop({ description: 'Timestamp', example: new Date() }) createdAt: Date;
  @Prop({ description: 'Timestamp', example: new Date() }) updatedAt: Date;
  @Prop({ description: 'Timestamp', example: null }) deletedAt: Date;
}
