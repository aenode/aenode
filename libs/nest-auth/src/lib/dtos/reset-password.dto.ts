import { Prop } from '@aenode/nest-prop';

export class ResetPasswordDto {
  @Prop({ required: true, format: 'password' }) password: string;
}
