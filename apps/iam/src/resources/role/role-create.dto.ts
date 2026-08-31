import { Prop, InputType, PartialType } from '@aenode/nestjs/graphql';


@InputType()
export class RoleCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ isRequired: true }) appId: number;
  @Prop({ isRequired: true }) name: string;
}

@InputType()
export class RoleUpdateDto extends PartialType(RoleCreateDto) { } 