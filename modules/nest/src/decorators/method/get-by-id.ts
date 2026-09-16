import { names } from '@aenode/names';
import { Get, type Type } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function GetById(okResponseType?: Type): MethodDecorator {
  return (...args) => {
    const { camel } = names(args[0].constructor.name);
    const resourceName = camel.split('Controller').shift();

    const summary = `Find ${resourceName} by id`;

    [
      Get(':id'),
      ApiOperation({ summary }),
      ApiOkResponse({ type: okResponseType, summary, description: 'Found' }),
      ApiNotFoundResponse({ description: 'Not found' }),
    ].forEach((d) => d(...args));
  };
}
