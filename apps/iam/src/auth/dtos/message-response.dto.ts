import { BaseDtoClass, Prop } from '@aenode/prop';

export class MessageResponseDto extends BaseDtoClass<MessageResponseDto> {
  @Prop() message: string;
}
