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
          type: InputValiationErrorDto,
          example: new InputValiationErrorDto(),
          isArray: true,
        }),
        ApiUnauthorizedResponse({
          type: MessageDto,
          example: new MessageDto(),
          description: 'Unauthorized ',
        }),
        ApiInternalServerErrorResponse({
          type: MessageDto,
          example: new MessageDto(),
          description: 'Internal error',
        }),
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
        ApiCreatedResponse({
          type: this.responseType,
          example: new this.responseType(),
          description: 'Created',
        }),
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
        ApiOkResponse({
          type: [this.responseType],
          example: [new this.responseType()],
          description: 'Found',
        }),
      ].forEach((d) => d(...args));
    };
  }

  GetOneById(): MethodDecorator {
    return (...args) => {
      const summary = `Find ${this.resouceName} by id`;

      [
        this.Common(),
        Get(':id'),
        ApiParam({ type: Number, name: 'id', description: 'Unique entry id' }),
        ApiOperation({ summary }),
        ApiOkResponse({
          type: this.responseType,
          example: new this.responseType(),
          description: 'Found',
        }),
        ApiNotFoundResponse({
          type: MessageDto,
          example: new MessageDto(),
          description: 'Not found',
        }),
      ].forEach((d) => d(...args));
    };
  }

  PutOneById(): MethodDecorator {
    return (...args) => {
      const summary = `Update ${this.resouceName} by id`;

      [
        this.Common(),
        Put(':id'),
        ApiParam({ type: Number, name: 'id', description: 'Unique entry id' }),
        ApiOperation({ summary }),
        ApiOkResponse({
          type: this.responseType,
          example: new this.responseType(),
          description: 'Updated',
        }),
        ApiNotFoundResponse({
          type: MessageDto,
          example: new MessageDto(),
          description: 'Not found',
        }),
      ].forEach((d) => d(...args));
    };
  }

  DeleteOneById(): MethodDecorator {
    return (...args) => {
      const summary = `Delete ${this.resouceName} by id`;

      [
        this.Common(),
        Delete(':id'),
        ApiParam({ type: Number, name: 'id', description: 'Unique entry id' }),
        ApiOperation({ summary }),
        ApiOkResponse({
          type: this.responseType,
          example: new this.responseType(),
          description: 'Deleted',
        }),
        ApiNotFoundResponse({
          type: MessageDto,
          example: new MessageDto(),
          description: 'Not found',
        }),
      ].forEach((d) => d(...args));
    };
  }
}
