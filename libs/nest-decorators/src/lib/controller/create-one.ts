import { Post, type Type } from '@aenode/nest/common';
import { ApiCreatedResponse, ApiOperation } from '@aenode/nest/swagger';
import { Operation } from '@aenode/types';
import { OperationName } from '../metadata/operation-name.js';
import { CommonMethod } from './common-method.js';

export function CreateOne(responseType: Type): MethodDecorator {
  return (...args) => {
    CommonMethod()(...args);
    ApiOperation({ summary: 'Create one' })(...args);
    ApiCreatedResponse({
      type: responseType,
      description: 'Successfull',
    })(...args);
    OperationName(Operation.WRITE)(...args);
    Post()(...args);
  };
}
