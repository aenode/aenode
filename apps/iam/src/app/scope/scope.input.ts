import { PartialType, PickType, Prop } from '@aenode/nest';

export class ScopeReadDto {
  @Prop({ description: 'Primary unique id', example: 1 }) id: number;
  @Prop({ description: 'Timestamp', example: new Date() }) createdAt: Date;
  @Prop({ description: 'Timestamp', example: new Date() }) updatedAt: Date;
  @Prop({ description: 'Timestamp', example: null }) deletedAt: Date;

  @Prop({
    required: true,
    format: 'name',
    description: 'Unique scope name',
    example: 'iam',
  })
  name: string;

  @Prop({
    maxLength: 400,
    description: 'Scope description',
    example: 'Identity and access management',
  })
  description?: string;
}

export class ScopeCreateDto extends PickType(ScopeReadDto, [
  'name',
  'description',
]) {}

export class ScopeUpdateDto extends PartialType(ScopeCreateDto) {}
