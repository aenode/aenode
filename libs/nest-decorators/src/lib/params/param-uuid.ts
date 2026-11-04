import { Param, ParseUUIDPipe } from '@aenode/nest/common';

export function ParamUUID(): ParameterDecorator {
  return (...args) => {
    Param('id', ParseUUIDPipe)(...args);
  };
}
