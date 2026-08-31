import { Prop, InputType, PartialType } from '@aenode/nestjs/graphql';


@InputType()
export class UserRoleCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ isRequired: true }) appId: number;
  @Prop({ isRequired: true }) userId: number;
  @Prop({ isRequired: true }) roleId: number;
}

@InputType()
export class UserRoleUpdateDto extends PartialType(UserRoleCreateDto) { } 