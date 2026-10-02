import { Prop } from '@aenode/nest-prop';

export class LoginWithOTPDto {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) otp: string;
}
