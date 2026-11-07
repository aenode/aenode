import { BaseDtoClass, Prop } from '@aenode/prop';

export class LoginDto extends BaseDtoClass<LoginDto> {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) password: string;
}
