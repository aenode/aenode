import { extractResourceName, names } from '@aenode/names';
import { getReturnType } from '@aenode/reflect';
import { Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResouceName } from './resource-name.js';

export function CommonMethod(resourceName: string): MethodDecorator {
  return (...args) => {
    const { sentence } = names(args[1].toString());

    [
      ApiBadRequestResponse(),
      ApiInternalServerErrorResponse(),
      ApiUnauthorizedResponse(),
      ApiOperation({
        summary: `${resourceName} | ${sentence} `,
        operationId: `${resourceName}_${args[1].toString()}`,
      }),
    ].forEach((d) => d(...args));
  };
}

export function CreateMethod(resouceName: string): MethodDecorator {
  return (...args) => {
    [Post(), CommonMethod(resouceName)].forEach((d) => d(...args));
  };
}

export function FindManyMethod(resourceName: string): MethodDecorator {
  return (...args) => {
    [
      Get(),
      CommonMethod(resourceName),
      ApiOkResponse({ type: () => getReturnType(args[0], args[1]) }),
    ].forEach((d) => d(...args));
  };
}

export function FindByIdMethod(resourceName: string): MethodDecorator {
  return (...args) => {
    [
      Get(`:id`),
      CommonMethod(resourceName),
      ApiOkResponse({ type: () => getReturnType(args[0], args[1]) }),
    ].forEach((d) => d(...args));
  };
}

export function AutoController(): ClassDecorator {
  return (target) => {
    const resouceName = extractResourceName(target.name);
    const { kebab } = names(resouceName);

    [Controller(kebab), ResouceName(resouceName)].forEach((d) => d(target));
  };
}
