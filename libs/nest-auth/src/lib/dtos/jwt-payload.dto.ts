import { Prop } from '@aenode/nest-prop';

export class JwtPayloadDto {
  @Prop() sub: number;
}
