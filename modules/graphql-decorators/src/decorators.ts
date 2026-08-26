import { extractResourceName } from '@aenode/names';
import { ParseIntPipe, ParseUUIDPipe, type Type } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

/**
 * GraphQl find-many method decorator
 *
 * @param type
 * @returns
 */
export function FindMany(type: () => [Type]): MethodDecorator {
  return (...args) => {
    const className = args[0].constructor.name;
    const resourceName = extractResourceName(className);
    const operationName = `findMany${resourceName}`;
    Query(type, { name: operationName })(...args);
  };
}

/**
 * GraphQL find-one method decorator
 * @param type
 * @returns
 */
export function FindOneById(type: () => Type): MethodDecorator {
  return (...args) => {
    const className = args[0].constructor.name;
    const resourceName = extractResourceName(className);
    const operationName = `findOne${resourceName}ById`;
    Query(type, { name: operationName, nullable: true })(...args);
  };
}

/**
 * GraphQL find-paramters decorator
 * @param type
 * @returns
 */
export function FindArgs(type: () => Type): ParameterDecorator {
  return (...args) => {
    Args({ type, nullable: true, name: 'findArgs' })(...args);
  };
}

/**
 * GraphQL "id" paramter decorator
 *
 * @returns
 */
export function ArgsId(): ParameterDecorator {
  return (...args) => {
    Args({ type: () => Number, name: 'entityId' }, ParseIntPipe)(...args);
  };
}

/**
 * GraphQL "uuid" paramter decorator
 *
 * @returns
 */
export function ArgsUuid(): ParameterDecorator {
  return (...args) => {
    Args({ type: () => String, name: 'entityId' }, ParseUUIDPipe)(...args);
  };
}

export function AutoResolver(type: () => Type): ClassDecorator {
  return (...args) => {
    Resolver(type, {})(...args);
  };
}
