import { Prop } from '@aenode/nest-prop';

export class ResponseMessageDto {
  @Prop() message: string;
}

export class ValiationErrorDto {
  @Prop({ example: 'name' }) property: string;
  @Prop({ example: 'isString' }) constraint: string;
  @Prop({ example: 'The name property should be string' }) message: string;
}

export class ValidationErorResponseDto {
  @Prop({ type: () => ValiationErrorDto }) errors: ValiationErrorDto[];
}
