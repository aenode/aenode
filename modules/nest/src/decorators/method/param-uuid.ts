import { Param, ParseUUIDPipe } from '@nestjs/common';

export function ParamUuid(): ParameterDecorator {
  return (...args) => {
    Param('id', ParseUUIDPipe)(...args);
  };
}
