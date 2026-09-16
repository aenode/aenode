import type { StringArray } from '@aenode/prop-validation';
import { Controller, Delete, Get, Post, Put, type Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Prop } from '../prop/prop.js';

export class ValiationErrorDto {
  @Prop() errors: StringArray;
}

export class ResourceDecorator {
  constructor(
    protected readonly resouceName: string,
    protected readonly responseType: Type,
  ) {}

  Controller(): ClassDecorator {
    return (...args) => {
      Controller(this.resouceName)(...args);
    };
  }

  protected Common(): MethodDecorator {
    return (...args) => {
      [
        ApiBadRequestResponse({
          description: 'Invalid input',
          type: ValiationErrorDto,
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized request' }),
        ApiInternalServerErrorResponse({ description: 'Internal error' }),
      ].forEach((d) => d(...args));
    };
  }

  PostOne(): MethodDecorator {
    return (...args) => {
      const summary = `Create one ${this.resouceName}`;

      [
        this.Common(),
        Post(),
        ApiOperation({ summary }),
        ApiCreatedResponse({ type: this.responseType }),
      ].forEach((d) => d(...args));
    };
  }

  GetMany(): MethodDecorator {
    return (...args) => {
      const summary = `Find  many ${this.resouceName}`;

      [
        this.Common(),
        Get(),
        ApiOperation({ summary }),
        ApiOkResponse({ type: [this.responseType] }),
      ].forEach((d) => d(...args));
    };
  }

  GetOneById(): MethodDecorator {
    return (...args) => {
      const summary = `Find ${this.resouceName} by id`;

      [
        this.Common(),
        Get(':id'),
        ApiOperation({ summary }),
        ApiOkResponse({ type: this.responseType }),
        ApiNotFoundResponse({ description: 'Not found' }),
      ].forEach((d) => d(...args));
    };
  }

  PutOneById(): MethodDecorator {
    return (...args) => {
      const summary = `Update ${this.resouceName} by id`;

      [
        this.Common(),
        Put(':id'),
        ApiOperation({ summary }),
        ApiOkResponse({ type: this.responseType }),
        ApiNotFoundResponse(),
      ].forEach((d) => d(...args));
    };
  }

  DeleteOneById(): MethodDecorator {
    return (...args) => {
      const summary = `Delete ${this.resouceName} by id`;

      [
        this.Common(),
        Delete(':id'),
        ApiOperation({ summary }),
        ApiOkResponse({ type: this.responseType }),
        ApiNotFoundResponse(),
      ].forEach((d) => d(...args));
    };
  }
}
