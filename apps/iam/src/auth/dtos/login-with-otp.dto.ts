import { Prop } from '@aenode/prop';

export class LoginWithOtpDto {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) otp: string;
}
