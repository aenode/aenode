import { PartialType, PickType, Prop } from '@aenode/nest';

export class ScopeDto {
  @Prop({ description: 'Primary unique id' }) id: number;
  @Prop({ description: 'Timestamp' }) createdAt: Date;
  @Prop({ description: 'Timestamp' }) updatedAt: Date;
  @Prop({ description: 'Timestamp' }) deletedAt: Date;

  @Prop({
    required: true,
    minLength: 3,
    maxLength: 255,
    description: 'Unique scope name',
  })
  name: string;

  @Prop({ maxLength: 400 })
  description?: string;

  constructor(value?: Partial<ScopeDto>) {
    if (value) {
      Object.assign(this, value);
    }
  }
}

export class ScopeCreateDto extends PickType(ScopeDto, [
  'name',
  'description',
]) {}

export class ScopeUpdateDto extends PartialType(ScopeCreateDto) {}
