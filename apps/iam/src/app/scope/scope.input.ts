import { PartialType, PickType, Prop } from '@aenode/nest';

export class ScopeDto {
  @Prop({ description: 'Primary unique id' }) id = 1;
  @Prop({ description: 'Timestamp' }) createdAt: Date = new Date();
  @Prop({ description: 'Timestamp' }) updatedAt: Date = new Date();
  @Prop({ description: 'Timestamp' }) deletedAt: Date = new Date();

  @Prop({ description: 'Unique scope name' }) name = 'scope name';
}

export class ScopeCreateDto extends PickType(ScopeDto, ['name']) {
  @Prop({ required: true, minLength: 3, maxLength: 255 })
  override name: string;
}

export class ScopeUpdateDto extends PartialType(ScopeCreateDto) {}
