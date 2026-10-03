import { createParamDecorator } from '@nestjs/common';

export const UserUsername = createParamDecorator((_data, context) => {
  return context.switchToHttp().getRequest().user.username;
});
