import { Prop } from '@aenode/nest-prop';

export class LoginDto {
  @Prop({ required: true, example: 'aenode+root@aenode.io' }) username: string;
  @Prop({ required: true, example: '!Password123.' }) password: string;
}
