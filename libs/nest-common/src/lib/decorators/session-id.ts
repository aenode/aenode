import { createParamDecorator } from '@nestjs/common';

export const SessionId = createParamDecorator((_data, context) => {
  return context.switchToHttp().getRequest().session.id;
});
