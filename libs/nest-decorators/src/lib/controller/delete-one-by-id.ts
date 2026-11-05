import { Delete } from '@aenode/nest/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@aenode/nest/swagger';
import { Operation } from '@aenode/types';
import { OperationName } from '../metadata/operation-name.js';
import { CommonMethod } from './common-method.js';
import type { MethodOptions } from './method-options.js';

export function DeleteOneById(options: MethodOptions): MethodDecorator {
  return (...args) => {
    CommonMethod(options)(...args);
    ApiOkResponse({
      type: options.responseType,
      description: 'Successfull',
    })(...args);
    ApiNotFoundResponse({ description: 'Not found' })(...args);
    OperationName(Operation.DELETE)(...args);
    Delete(':id')(...args);
  };
}
