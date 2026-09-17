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

      const currentTarget = target.prototype;
      const methods = getMethodNames(target);

      for (const propertyKey of methods) {
        const decorator = this.getMethodDecorator(propertyKey);

        if (!decorator) {
          continue;
        }

        const descriptor = getMethodDescriptor(currentTarget, propertyKey);

        if (!descriptor) {
          continue;
        }

        decorator(currentTarget, propertyKey, descriptor);
      }
    };
  }

  Controller(): ClassDecorator {
    return (target) => {
      Controller(this.resouceName)(target);
    };
  }

  protected CommonMethod(): MethodDecorator {
    return (target, propertyKey, descriptor) => {
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
      ].forEach((d) => d(target, propertyKey, descriptor));
    };
  }

  PostOne(): MethodDecorator {
    return (target, propertyKey, descriptor) => {
      const summary = `Create one ${this.resouceName}`;

      [
        this.CommonMethod(),
        Post(),
        ApiOperation({ summary }),
        ApiCreatedResponse({
          type: this.readDto,
          description: 'Created',
        }),
      ].forEach((d) => d(target, propertyKey, descriptor));
    };
  }

  createOne() {
    return this.PostOne();
  }

  GetMany(): MethodDecorator {
    return (target, propertyKey, descriptor) => {
      const summary = `Find  many ${this.resouceName}`;

      [
        this.CommonMethod(),
        Get(),
        ApiOperation({ summary }),
        ApiOkResponse({
          type: [this.readDto],
          description: 'Found',
        }),
      ].forEach((d) => d(target, propertyKey, descriptor));
    };
  }

  findMany() {
    return this.GetMany();
  }

  GetOneById(): MethodDecorator {
    return (target, propertyKey, descriptor) => {
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
      ].forEach((d) => d(target, propertyKey, descriptor));
    };
  }

  findOneById() {
    return this.GetOneById();
  }

  PutOneById(): MethodDecorator {
    return (target, propertyKey, descriptor) => {
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
      ].forEach((d) => d(target, propertyKey, descriptor));
    };
  }
  updateOneById() {
    return this.PutOneById();
  }

  DeleteOneById(): MethodDecorator {
    return (target, propertyKey, descriptor) => {
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
      ].forEach((d) => d(target, propertyKey, descriptor));
    };
  }

  deleteOneById() {
    return this.DeleteOneById();
  }
}

export function Autowire(options: ResourceDecoratorOptions): ClassDecorator {
  return (target) => {
    new ResourceDecorator(options).Autowire()(target);
  };
}
