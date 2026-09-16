import { PartialType, PickType, Prop } from '@aenode/nest';

export class ScopeDto {
  @Prop({ description: 'Primary unique id' }) id?: number;
  @Prop({ description: 'Timestamp' }) createdAt?: Date;
  @Prop({ description: 'Timestamp' }) updatedAt?: Date;
  @Prop({ description: 'Timestamp' }) deletedAt?: Date;

  @Prop({ description: 'Unique scope name' }) name: string;
}

export class ScopeCreateDto extends PickType(ScopeDto, ['name']) {
  @Prop({ required: true, minLength: 3, maxLength: 255 })
  override name: string;
}

export class ScopeUpdateDto extends PartialType(ScopeCreateDto) {}
