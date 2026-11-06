import { Prop } from '@aenode/prop';

export class LoginDto {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) password: string;
}
