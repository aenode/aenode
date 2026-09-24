import { Prop } from '@aenode/nest-prop';

export class ValiationErrorDto {
  @Prop() constraint: string;
  @Prop() message: string;
}

export class ValidationErorResponseDto {
  @Prop({ type: () => ValiationErrorDto }) errors: ValiationErrorDto[];
}
