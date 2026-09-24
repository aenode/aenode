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
} from '../dtos/common.js';

export type ResourceDecoratorFactoryOptions = {
  singularPath: string;
  pluralPath?: string;
  responseType: Type;
  createResponseType?: Type;
  findResponseType?: Type;
  findOneResponseType?: Type;
  updateResponseType?: Type;
  deleteResponseType?: Type;
};

export class ResourceDecoratorFactory {
  constructor(private readonly options: ResourceDecoratorFactoryOptions) {}

  private get singularPath() {
    return this.options.singularPath;
  }

  private get pluralPath() {
    return this.options.pluralPath ?? this.singularPath;
  }

  private get idPath() {
    return `${this.singularPath}/:id`;
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
      ApiInternalServerErrorResponse({ type: ResponseMessageDto })(...args);
      ApiBadRequestResponse({ type: ResponseMessageDto })(...args);
    };
  }

  Controller(): ClassDecorator {
    return (...args) => {
      Controller()(...args);
      ApiBearerAuth()(...args);
    };
  }
  /**
   * POST /item
   *
   * @param type return type
   * @returns
   */
  Create(): MethodDecorator {
    return (...args) => {
      this.CommonResponse()(...args);
      ApiOperation({ summary: 'Create item' })(...args);
      ApiOkResponse({ type: this.createResponseType })(...args);
      ApiUnprocessableEntityResponse({ type: ValidationErorResponseDto })(
        ...args,
      );

      Post(this.singularPath)(...args);
    };
  }

  /**
   * GET /items
   * @returns
   */
  Find(): MethodDecorator {
    return (...args) => {
      this.CommonResponse()(...args);

      ApiOperation({ summary: 'Find many' })(...args);
      ApiOkResponse({ type: this.findResponseType, isArray: true })(...args);
      Get(this.pluralPath)(...args);
    };
  }

  /**
   * GET /item/:id
   *
   * @returns
   */
  FindOneById(): MethodDecorator {
    return (...args) => {
      this.CommonResponse()(...args);

      ApiOperation({ summary: 'Find one' })(...args);
      ApiOkResponse({ type: this.findOneResponseType })(...args);
      ApiNotFoundResponse({
        type: ResponseMessageDto,
        description: 'Item not found',
      })(...args);
      Get(this.idPath)(...args);
    };
  }
  /**
   * PUT /item/:id
   *
   * @returns
   */
  UpdateOne(): MethodDecorator {
    return (...args) => {
      this.CommonResponse()(...args);

      ApiOperation({ summary: 'Update one' })(...args);
      ApiOkResponse({ type: this.updateResponseType })(...args);
      ApiUnprocessableEntityResponse({ type: ValidationErorResponseDto })(
        ...args,
      );
      ApiNotFoundResponse({
        type: ResponseMessageDto,
        description: 'Item not found',
      })(...args);
      Put(this.idPath)(...args);
    };
  }

  /**
   * DELETE /item/:id
   *
   * @returns
   */
  DeleteOne(): MethodDecorator {
    return (...args) => {
      this.CommonResponse()(...args);

      ApiOperation({ summary: 'Delete one' })(...args);
      ApiOkResponse({ type: this.deleteResponseType })(...args);
      ApiNotFoundResponse({
        type: ResponseMessageDto,
        description: 'Item not found',
      })(...args);
      Delete(this.idPath)(...args);
    };
  }
}
