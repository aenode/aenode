import { createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator((_data, context) => {
  return context.switchToHttp().getRequest().user.id;
});
