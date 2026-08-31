import { Prop, InputType, PartialType } from '@aenode/nestjs/graphql';


@InputType()
export class UserCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ isRequired: true }) fullName: string;
  @Prop({ isRequired: true }) username: string;
  @Prop({ isRequired: true }) password: string;
  @Prop() lastLogin?: Date;
}

@InputType()
export class UserUpdateDto extends PartialType(UserCreateDto) { } 