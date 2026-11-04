import { Get, type Type } from '@aenode/nest/common';
import { ApiOkResponse, ApiOperation } from '@aenode/nest/swagger';
import { Operation } from '@aenode/types';
import { OperationName } from '../metadata/operation-name.js';
import { CommonMethod } from './common-method.js';

export function FindMany(responseType: Type): MethodDecorator {
  return (...args) => {
    CommonMethod()(...args);
    ApiOperation({ summary: 'Find many' })(...args);
    ApiOkResponse({
      type: responseType,
      isArray: true,
      description: 'Successfull',
    })(...args);
    OperationName(Operation.READ_MANY)(...args);
    Get()(...args);
  };
}
