import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@aenode/nest/swagger';
import { Public } from '../metadata/public.js';
import { Emit } from './emit.js';
import type { MethodOptions } from './method-options.js';
import { operationSummary } from './operation-summary.js';

export function CommonMethod(options: MethodOptions): MethodDecorator {
  return (...args) => {
    options.summary ??= operationSummary(
      ...(args as Parameters<MethodDecorator>),
    );
    ApiInternalServerErrorResponse({ description: 'Internal error' })(...args);
    ApiOperation({ summary: options.summary });
    ApiUnauthorizedResponse({
      description: 'User does not have sufficint permissions',
    })(...args);
    ApiUnprocessableEntityResponse({ description: 'Input validation error' })(
      ...args,
    );

    if (options.emit === true) {
      Emit()(...args);
    }

    if (options.public === true) {
      Public()(...args);
    }
  };
}
