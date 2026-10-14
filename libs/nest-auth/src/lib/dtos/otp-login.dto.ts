import { Prop } from '@aenode/nest-prop';

export class OtpLoginDto {
  @Prop({ required: true, example: 'aenode+root@aenode.io' }) username: string;
  @Prop({ required: true }) otp: string;
}
