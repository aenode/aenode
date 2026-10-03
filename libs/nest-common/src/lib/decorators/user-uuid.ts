import { createParamDecorator } from '@nestjs/common';

export const UserUuid = createParamDecorator((_data, context) => {
  return context.switchToHttp().getRequest().user.uuid;
});
