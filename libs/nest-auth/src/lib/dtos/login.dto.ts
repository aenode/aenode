import { Prop } from '@aenode/nest-prop';

export class LoginDto {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) password: string;
}
