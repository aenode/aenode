import { extractResourceName, names } from '@aenode/names';
import { getReturnType } from '@aenode/reflect';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function CommonMethod(resourceName: string): MethodDecorator {
  return (...args) => {
    const { sentence } = names(args[1].toString());

    [
      ApiBadRequestResponse(),
      ApiInternalServerErrorResponse(),
      ApiUnauthorizedResponse(),
      ApiOperation({ summary: `${resourceName} | ${sentence} ` }),
    ].forEach((d) => d(...args));
  };
}

export function FindMany(resourceName: string): MethodDecorator {
  return (...args) => {
    [
      Get(),
      CommonMethod(resourceName),
      ApiOkResponse({ type: () => getReturnType(args[0], args[1]) }),
    ].forEach((d) => d(...args));
  };
}

export function FindBy(resourceName: string, key: string): MethodDecorator {
  return (...args) => {
    [
      Get(`:${key}`),
      CommonMethod(resourceName),
      ApiOkResponse({ type: () => getReturnType(args[0], args[1]) }),
    ].forEach((d) => d(...args));
  };
}
export function FindById(resourceName: string): MethodDecorator {
  return (...args) => {
    [
      Get(':id'),
      CommonMethod(resourceName),
      ApiOkResponse({ type: () => getReturnType(args[0], args[1]) }),
    ].forEach((d) => d(...args));
  };
}

export function AutoController(): ClassDecorator {
  return (target) => {
    const resouceName = extractResourceName(target.name);
    const { kebab } = names(resouceName);

    Controller(kebab)(target);

    console.log(target);
  };
}
