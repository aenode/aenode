import { BaseDtoClass, Prop } from '@aenode/prop';

export class LoginWithOtpDto extends BaseDtoClass<LoginWithOtpDto> {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) otp: string;
}
