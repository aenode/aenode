import { getMethodDescriptor, getMethodNames } from '@aenode/reflect';
import { Controller, Delete, Get, Post, Put, type Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InputValiationErrorDto } from '../../validation/input-validation-error.dto.js';
import { MessageDto } from '../../validation/message.dto.js';

export type ResourceDecoratorOptions = {
  name: string;
  readDto: Type;
  createDto: Type;
  updateDto: Type;
};
export class ResourceDecorator {
  constructor(protected readonly options: ResourceDecoratorOptions) {}

  protected get resouceName() {
    return this.options.name;
  }

  protected get readDto() {
    return this.options.readDto;
  }

  protected get createDto() {
    return this.options.createDto;
  }

  protected get updateDto() {
    return this.options.updateDto;
  }

  private getMethodDecorator(
    methodName: string | symbol,
  ): MethodDecorator | undefined {
    if (typeof methodName !== 'string') {
      return undefined;
    }

    const decoratorFactory = (this as unknown as Record<string, unknown>)[
      methodName
    ];

    if (typeof decoratorFactory !== 'function') {
      return undefined;
    }

    return (decoratorFactory as () => MethodDecorator).call(this);
  }

  Autowire(): ClassDecorator {
    return (target) => {
      this.Controller()(target);

      const prototype = target.prototype;
      const methods = getMethodNames(target);

      for (const methodName of methods) {
        const decorator = this.getMethodDecorator(methodName);

        if (!decorator) {
          continue;
        }

        const descriptor = getMethodDescriptor(prototype, methodName);

        if (!descriptor) {
          continue;
        }

        decorator(prototype, methodName, descriptor);
      }
    };
  }

  Controller(): ClassDecorator {
    return (...args) => {
      Controller(this.resouceName)(...args);
    };
  }

  protected CommonMethod(): MethodDecorator {
    return (...args) => {
      [
        ApiBadRequestResponse({
          description: 'Invalid input',
          type: InputValiationErrorDto,
          isArray: true,
        }),
        ApiUnauthorizedResponse({
          type: MessageDto,
          description: 'Unauthorized ',
        }),
        ApiInternalServerErrorResponse({
          type: MessageDto,
          description: 'Internal error',
        }),
      ].forEach((d) => d(...args));
    };
  }

  PostOne(): MethodDecorator {
    return (...args) => {
      const summary = `Create one ${this.resouceName}`;

      [
        this.CommonMethod(),
        Post(),
        ApiOperation({ summary }),
        ApiCreatedResponse({
          type: this.readDto,
          description: 'Created',
        }),
      ].forEach((d) => d(...args));
    };
  }
  createOne() {
    return this.PostOne();
  }

  GetMany(): MethodDecorator {
    return (...args) => {
      const summary = `Find  many ${this.resouceName}`;

      [
        this.CommonMethod(),
        Get(),
        ApiOperation({ summary }),
        ApiOkResponse({
          type: [this.readDto],
          description: 'Found',
        }),
      ].forEach((d) => d(...args));
    };
  }

  findMany() {
    return this.GetMany();
  }

  GetOneById(): MethodDecorator {
    return (...args) => {
      const summary = `Find ${this.resouceName} by id`;

      [
        this.CommonMethod(),
        Get(':id'),
        ApiParam({ type: Number, name: 'id', description: 'Unique entry id' }),
        ApiOperation({ summary }),
        ApiOkResponse({
          type: this.readDto,
          description: 'Found',
        }),
        ApiNotFoundResponse({
          type: MessageDto,
          description: 'Not found',
        }),
      ].forEach((d) => d(...args));
    };
  }

  findOneById() {
    return this.GetOneById();
  }

  PutOneById(): MethodDecorator {
    return (...args) => {
      const summary = `Update ${this.resouceName} by id`;

      [
        this.CommonMethod(),
        Put(':id'),
        ApiParam({ type: Number, name: 'id', description: 'Unique entry id' }),
        ApiOperation({ summary }),
        ApiOkResponse({
          type: this.readDto,
          description: 'Updated',
        }),
        ApiNotFoundResponse({
          type: MessageDto,
          description: 'Not found',
        }),
      ].forEach((d) => d(...args));
    };
  }
  updateOneById() {
    return this.PutOneById();
  }

  DeleteOneById(): MethodDecorator {
    return (...args) => {
      const summary = `Delete ${this.resouceName} by id`;

      [
        this.CommonMethod(),
        Delete(':id'),
        ApiParam({ type: Number, name: 'id', description: 'Unique entry id' }),
        ApiOperation({ summary }),
        ApiOkResponse({ type: this.options.readDto }),
        ApiNotFoundResponse({
          type: MessageDto,
          description: 'Not found',
        }),
      ].forEach((d) => d(...args));
    };
  }

  deleteOneById() {
    return this.DeleteOneById();
  }
}

export function Autowire(options: ResourceDecoratorOptions): ClassDecorator {
  return (...args) => {
    new ResourceDecorator(options).Autowire()(...args);
  };
}
