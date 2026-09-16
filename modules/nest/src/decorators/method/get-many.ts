import { names } from '@aenode/names';
import { Get, type Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function GetMany(okResponseType?: Type | [Type]): MethodDecorator {
  return (...args) => {
    const { camel } = names(args[0].constructor.name);
    const resourceName = camel.split('Controller').shift();

    const summary = `Find  many ${resourceName}`;

    [
      Get(),
      ApiOperation({ summary }),
      ApiOkResponse({ type: okResponseType, summary, description: 'Found' }),
    ].forEach((d) => d(...args));
  };
}
