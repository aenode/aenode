import { Post } from '@aenode/nest/common';
import { ApiCreatedResponse } from '@aenode/nest/swagger';
import { Operation } from '@aenode/types';
import { OperationName } from '../metadata/operation-name.js';
import { CommonMethod } from './common-method.js';
import type { MethodOptions } from './method-options.js';

export function CreateOne(options: MethodOptions): MethodDecorator {
  return (...args) => {
    CommonMethod(options)(...args);
    ApiCreatedResponse({
      type: options.responseType,
      description: 'Successfull',
    })(...args);
    OperationName(Operation.WRITE)(...args);
    Post()(...args);
  };
}
