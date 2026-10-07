import { Prop } from '@aenode/nest-prop';

export class JwtPayloadDto {
  @Prop() sessionId: number;
  @Prop() userId: number;
  @Prop() deviceId: string;
  @Prop() userAgent?: string;
}
