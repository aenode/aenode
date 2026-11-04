import { Get, type Type } from '@aenode/nest/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@aenode/nest/swagger';
import { Operation } from '@aenode/types';
import { OperationName } from '../metadata/operation-name.js';
import { CommonMethod } from './common-method.js';

export function FindOneById(responseType: Type): MethodDecorator {
  return (...args) => {
    CommonMethod()(...args);
    ApiOperation({ summary: 'Find one by id' })(...args);
    ApiOkResponse({
      type: responseType,
      description: 'Successfull',
    })(...args);
    ApiNotFoundResponse({ description: 'Not found' })(...args);
    OperationName(Operation.READ)(...args);
    Get(':id')(...args);
  };
}
