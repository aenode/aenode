import { Prop, InputType, PartialType } from '@aenode/nestjs/graphql';


@InputType()
export class RolePermissionCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ isRequired: true }) appId: number;
  @Prop({ isRequired: true }) roleId: number;
  @Prop({ isRequired: true }) permissionId: number;
}

@InputType()
export class RolePermissionUpdateDto extends PartialType(RolePermissionCreateDto) { } 