import { Delete, type Type } from '@aenode/nest/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@aenode/nest/swagger';
import { Operation } from '@aenode/types';
import { OperationName } from '../metadata/operation-name.js';
import { CommonMethod } from './common-method.js';

export function DeleteOneById(responseType: Type): MethodDecorator {
  return (...args) => {
    CommonMethod()(...args);
    ApiOperation({ summary: 'Delete one by id' })(...args);
    ApiOkResponse({
      type: responseType,
      description: 'Successfull',
    })(...args);
    ApiNotFoundResponse({ description: 'Not found' })(...args);
    OperationName(Operation.DELETE)(...args);
    Delete(':id')(...args);
  };
}
