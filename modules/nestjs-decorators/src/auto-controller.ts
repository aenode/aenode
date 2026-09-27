import { extractResourceName, names } from '@aenode/names';
import { getReturnType } from '@aenode/reflect';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
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

export function UpdateByIdMethod(resouceName: string): MethodDecorator {
  return (...args) => {
    [Put(':id'), CommonMethod(resouceName)].forEach((d) => d(...args));
  };
}

export function DeleteByIdMethod(resouceName: string): MethodDecorator {
  return (...args) => {
    [Delete(':id'), CommonMethod(resouceName)].forEach((d) => d(...args));
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

    if (/^create.*$/i.test(methodName)) {
      CreateMethod(resourceName)(...args);
      if (/^findMany.*$/i.test(methodName)) {
        FindManyMethod(resourceName)(...args);
      } else if (/^find.*ById/i.test(methodName)) {
        FindByIdMethod(resourceName)(...args);
      } else if (/^update.*ById/i.test(methodName)) {
        UpdateByIdMethod(resourceName)(...args);
      } else if (/^delete.*ById/i.test(methodName)) {
        DeleteByIdMethod(resourceName)(...args);
      }
    }
  };
}

export function AutoController(): ClassDecorator {
  return (target: Parameters<ClassDecorator>[0]) => {
    const resouceName = extractResourceName(target.name);
    const { kebab } = names(resouceName);

    [Controller(kebab), ResouceName(resouceName)].forEach((d) => d(target));

    const methodNames = Object.getOwnPropertyNames(target.prototype).filter(
      (name) => {
        if (name === 'constructor') return false;

        const descriptor = Object.getOwnPropertyDescriptor(
          target.prototype,
          name,
        );

        return typeof descriptor?.value === 'function';
      },
    );

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
