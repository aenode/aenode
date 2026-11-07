import { BaseDtoClass, Prop } from '@aenode/prop';

export class CountResponseDto extends BaseDtoClass<CountResponseDto> {
  @Prop() count: number;
}
