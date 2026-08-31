import { Prop, InputType, PartialType } from '@aenode/nestjs/graphql';


@InputType()
export class AppCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ isRequired: true }) name: string;
  @Prop() description?: string;
  @Prop() url?: string;
}

@InputType()
export class AppUpdateDto extends PartialType(AppCreateDto) { } 