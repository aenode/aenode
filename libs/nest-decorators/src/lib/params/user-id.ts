import { createParamDecorator } from '@aenode/nest/common';
import { type ExtendedRequest } from '@aenode/types';

export const UserId = createParamDecorator((__data, context) => {
  return context.switchToHttp().getRequest<ExtendedRequest>().user.id;
});
