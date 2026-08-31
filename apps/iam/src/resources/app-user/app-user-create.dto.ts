import { Prop, InputType, PartialType } from '@aenode/nestjs/graphql';


@InputType()
export class AppUserCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ isRequired: true }) appId: number;
  @Prop({ isRequired: true }) userId: number;
  @Prop({ type: ()=>String, isArray: true }) operations: string[];
}

@InputType()
export class AppUserUpdateDto extends PartialType(AppUserCreateDto) { } 