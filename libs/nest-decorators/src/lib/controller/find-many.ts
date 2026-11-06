import { QueryMethod } from '@aenode/nest/common';
import { ApiOkResponse } from '@aenode/nest/swagger';
import { Operation } from '@aenode/types';
import { OperationName } from '../metadata/operation-name.js';
import { CommonMethod } from './common-method.js';
import type { MethodOptions } from './method-options.js';

export function FindMany(options: MethodOptions): MethodDecorator {
  return (...args) => {
    CommonMethod(options)(...args);
    ApiOkResponse({
      type: options.responseType,
      isArray: true,
      description: 'Successfull',
    })(...args);
    OperationName(Operation.READ_MANY)(...args);
    QueryMethod()(...args);
  };
}
