import { names, pluralize } from '@aenode/names';
import { Controller, Delete, Get, Post, Put, type Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  ResponseMessageDto,
  ValidationErorResponseDto,
} from '../dtos/response-types.js';
import { OperationName } from './operation-name.js';
import { ResourceName } from './resource-name.js';

export type ResourceDecoratorFactoryOptions = {
  resourceName: string;
  scope?: string;
  responseType: Type;
  createResponseType?: Type;
  findResponseType?: Type;
  findOneResponseType?: Type;
  updateResponseType?: Type;
  deleteResponseType?: Type;
  public?: boolean;
};

export class ResourceDecoratorFactory {
  constructor(private readonly options: ResourceDecoratorFactoryOptions) {}

  private get resourceName() {
    return this.resourceNames.snake;
  }

  private get resourceNames() {
    return names(this.options.resourceName);
  }

  private get singularPath() {
    return this.resourceNames.kebab;
  }

  private get pluralPath() {
    const __plural = pluralize(this.singularPath);
    if (__plural === this.singularPath) {
      return this.singularPath + 's';
    }
    return __plural;
  }

  private get idPath() {
    return `${this.singularPath}/:id`;
  }

  private get isPublic() {
    return this.options.public;
  }

  private get createResponseType() {
    return this.options.createResponseType ?? this.options.responseType;
  }

  private get updateResponseType() {
    return this.options.updateResponseType ?? this.options.responseType;
  }

  private get findResponseType() {
    return this.options.findResponseType ?? this.options.responseType;
  }

  private get findOneResponseType() {
    return (
      this.options.findOneResponseType ??
      this.options.findResponseType ??
      this.options.responseType
    );
  }
  private get deleteResponseType() {
    return this.options.findResponseType ?? this.options.responseType;
  }

  private CommonResponse(): MethodDecorator {
    return (...args) => {
      [
        ApiInternalServerErrorResponse({ type: ResponseMessageDto }),
        ApiBadRequestResponse({ type: ResponseMessageDto }),
      ].forEach((d) => d(...args));
    };
  }

  Controller(): ClassDecorator {
    return (...args) => {
      Controller()(...args);

      ResourceName(this.resourceName)(...args);
      if (this.isPublic !== true) {
        ApiBearerAuth()(...args);
      }
    };
  }

  /**
   * POST /item
   *
   * @param type return type
   * @returns
   */
  CreateOne(): MethodDecorator {
    return (...args) => {
      [
        this.CommonResponse(),
        OperationName('create_one'),
        ApiOperation({ summary: `Create one ${this.singularPath}` }),
        ApiOkResponse({ type: this.createResponseType }),
        ApiUnprocessableEntityResponse({ type: ValidationErorResponseDto }),
        Post(this.singularPath),
      ].forEach((d) => d(...args));
    };
  }

  /**
   * GET /items
   * @returns
   */
  FindMany(): MethodDecorator {
    return (...args) => {
      [
        this.CommonResponse(),
        OperationName('read_many'),
        ApiOperation({ summary: `Find many ${this.singularPath}` }),
        ApiOkResponse({ type: this.findResponseType, isArray: true }),
        Get(this.pluralPath),
      ].forEach((d) => d(...args));
    };
  }

  /**
   * GET /item/:id
   *
   * @returns
   */
  FindOneById(): MethodDecorator {
    return (...args) => {
      [
        this.CommonResponse(),
        OperationName('read_one'),
        ApiOperation({ summary: `Find one ${this.singularPath}` }),
        ApiOkResponse({ type: this.findOneResponseType }),
        ApiNotFoundResponse({
          type: ResponseMessageDto,
          description: `${this.singularPath} is not found by id`,
        }),
        Get(this.idPath),
      ].forEach((d) => d(...args));
    };
  }

  /**
   * PUT /item/:id
   *
   * @returns
   */
  UpdateOneById(): MethodDecorator {
    return (...args) => {
      [
        this.CommonResponse(),
        OperationName('update_one'),
        ApiOperation({ summary: `Update one ${this.singularPath}` }),
        ApiOkResponse({ type: this.updateResponseType }),
        ApiUnprocessableEntityResponse({ type: ValidationErorResponseDto }),
        ApiNotFoundResponse({
          type: ResponseMessageDto,
          description: `${this.singularPath} is not found by id`,
        }),
        Put(this.idPath),
      ].forEach((d) => d(...args));
    };
  }

  /**
   * DELETE /item/:id
   *
   * @returns
   */
  DeleteOneById(): MethodDecorator {
    return (...args) => {
      [
        this.CommonResponse(),
        OperationName('delete_one'),
        ApiOperation({ summary: `Delete one ${this.singularPath}` }),
        ApiOkResponse({ type: this.deleteResponseType }),
        ApiNotFoundResponse({
          type: ResponseMessageDto,
          description: `${this.singularPath} is not found by id`,
        }),
        Delete(this.idPath),
      ].forEach((d) => d(...args));
    };
  }
}
