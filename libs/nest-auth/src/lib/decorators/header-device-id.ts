import { Headers } from '@nestjs/common';

export function HeaderDeviceId(): ParameterDecorator {
  return (...args) => {
    Headers('x-device-id')(...args);
  };
}
