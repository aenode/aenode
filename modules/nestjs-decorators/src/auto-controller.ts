import { extractResourceName, names } from '@aenode/names';
import { getMethodNames, getReturnType } from '@aenode/reflect';
import { Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResouceName } from './resource-name.js';

export const MethodName = {
  findMany: 'findMany',
  findOneById: 'findOneById',
  create: 'create',
  update: 'update',
  delete: 'delete',
};

export type MethodName = keyof typeof MethodName;

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

export function AutoMethod(resourceName?: string): MethodDecorator {
  return (...args) => {
    const methodName = args[1].toString();

    resourceName ??= extractResourceName(args[0].constructor.name);

    switch (methodName as MethodName) {
      case 'findMany': {
        FindManyMethod(resourceName)(...args);
        break;
      }
      case 'findOneById': {
        FindManyMethod(resourceName)(...args);
        break;
      }
      case 'create': {
        FindManyMethod(resourceName)(...args);
        break;
      }
      case 'update': {
        FindManyMethod(resourceName)(...args);
        break;
      }
      case 'delete': {
        FindManyMethod(resourceName)(...args);
        break;
      }
    }
  };
}

export function AutoController(): ClassDecorator {
  return (target: Parameters<ClassDecorator>[0]) => {
    const resouceName = extractResourceName(target.name);
    const { kebab } = names(resouceName);

    [Controller(kebab), ResouceName(resouceName)].forEach((d) => d(target));

    const methodNames = getMethodNames(target.prototype);

    for (const methodName of methodNames) {
      const descriptor = Object.getOwnPropertyDescriptor(
        target.prototype,
        methodName,
      );
      if (!descriptor) throw new Error('No descriptor');
      AutoMethod(resouceName)(target, methodName, descriptor);
    }
  };
}
