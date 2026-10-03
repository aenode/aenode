import { Prop } from '@aenode/nest-prop';

export class LoginResponseDto {
  @Prop() deviceId: string;
  @Prop() token: string;
}
