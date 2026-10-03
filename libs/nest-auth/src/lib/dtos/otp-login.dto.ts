import { Prop } from '@aenode/nest-prop';

export class OtpLoginDto {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) otp: string;
}
