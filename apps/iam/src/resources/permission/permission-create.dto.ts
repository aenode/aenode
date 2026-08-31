import { Prop, InputType, PartialType } from '@aenode/nestjs/graphql';


@InputType()
export class PermissionCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ isRequired: true }) name: string;
  @Prop() description?: string;
  @Prop({ isRequired: true }) appId: number;
}

@InputType()
export class PermissionUpdateDto extends PartialType(PermissionCreateDto) { } 