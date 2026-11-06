import { Prop } from '@aenode/prop';

export class LoginDto {
  @Prop({ required: true, format: 'email' }) username: string;
  @Prop({ required: true }) password: string;
}

export class LoginWithOtpDto {
  @Prop({ required: true, format: 'email' }) username: string;
  @Prop({ required: true }) otp: string;
}
