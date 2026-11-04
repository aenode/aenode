import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@aenode/nest/swagger';

export function CommonMethod(): MethodDecorator {
  return (...args) => {
    ApiInternalServerErrorResponse({ description: 'Internal error' })(...args);
    ApiUnauthorizedResponse({
      description: 'User does not have sufficint permissions',
    })(...args);
    ApiUnprocessableEntityResponse({ description: 'Input validation error' })(
      ...args,
    );
  };
}
