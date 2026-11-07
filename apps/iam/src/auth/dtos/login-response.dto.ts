import { BaseDtoClass, Prop } from '@aenode/prop';

export class LoginResponseDto extends BaseDtoClass<LoginResponseDto> {
  @Prop() token: string;
  @Prop() deviceUUID: string;
}
