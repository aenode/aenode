import { Param, ParseIntPipe } from '@nestjs/common';

export function ParamId(): ParameterDecorator {
  return (...args) => {
    Param('id', ParseIntPipe)(...args);
  };
}
