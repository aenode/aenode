import { Param, ParseIntPipe } from '@aenode/nest/common';

export function ParamId(): ParameterDecorator {
  return (...args) => {
    Param('id', ParseIntPipe)(...args);
  };
}
