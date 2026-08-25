import {
  SetMetadata,
  type CustomDecorator,
  type ExecutionContext,
} from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export type MetdatadataDecorator<V = unknown> = {
  set: (value?: V) => CustomDecorator;
  setMethod: (value?: V) => MethodDecorator;
  setClass: (value?: V) => ClassDecorator;
  getAllAndMerge: <T extends Reflector>(
    reflector: T,
    context: ExecutionContext,
  ) => V[];
  getFromClass: <T extends Reflector>(
    reflector: T,
    context: ExecutionContext,
  ) => V;
  getFromMethod: <T extends Reflector>(
    reflector: T,
    context: ExecutionContext,
  ) => V;
  getAll: <T extends Reflector>(reflector: T, context: ExecutionContext) => V[];
  getAllAndOverride: <T extends Reflector>(
    reflector: T,
    context: ExecutionContext,
  ) => V;
};

export function createMetadataDecorator<V = unknown>(
  name: string,
): MetdatadataDecorator<V> {
  const __key = Symbol(name);

  const key = () => __key;

  const set = (value?: V): CustomDecorator => {
    return ((target, propertyKey, descriptor) => {
      SetMetadata(key(), value)(target, propertyKey, descriptor);
    }) as CustomDecorator;
  };

  const setMethod = (value?: V): MethodDecorator => {
    return (...args) => {
      SetMetadata(key(), value ?? true)(...args);
    };
  };

  const setClass = (value?: V): ClassDecorator => {
    return (...args) => {
      SetMetadata(key(), value ?? true)(...args);
    };
  };

  const getAllAndMerge = <T extends Reflector>(
    reflector: T,
    context: ExecutionContext,
  ) => {
    return reflector.getAllAndMerge(key(), [
      context.getHandler(),
      context.getClass(),
    ]);
  };

  const getFromClass = <T extends Reflector>(
    reflector: T,
    context: ExecutionContext,
  ) => {
    return reflector.get(key(), context.getClass());
  };

  const getFromMethod = <T extends Reflector>(
    reflector: T,
    context: ExecutionContext,
  ) => {
    return reflector.get(key(), context.getHandler());
  };

  const getAll = <T extends Reflector>(
    reflector: T,
    context: ExecutionContext,
  ) => {
    return reflector.getAll(key(), [context.getClass(), context.getHandler()]);
  };

  const getAllAndOverride = <T extends Reflector>(
    reflector: T,
    context: ExecutionContext,
  ) => {
    return reflector.getAllAndOverride(key(), [
      context.getClass(),
      context.getHandler(),
    ]);
  };

  return {
    set,
    setMethod,
    setClass,
    getAllAndMerge,
    getFromClass,
    getFromMethod,
    getAll,
    getAllAndOverride,
  };
}
