import { Prop } from '@aenode/nest-prop';

export class RestPasswordDto {
  @Prop({ required: true, format: 'password' }) password: string;
}
