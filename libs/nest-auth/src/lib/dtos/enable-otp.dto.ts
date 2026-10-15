import { Prop } from '@aenode/nest-prop';

export class EnableOtpDto {
  @Prop({ required: true }) otp: string;
}
