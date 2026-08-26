import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  type ExecutionContext,
  Injectable,
  type Provider,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * GraphQL cache interceptor
 */
@Injectable()
export class GqlCacheInterceptor extends CacheInterceptor {
  override trackBy(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();

    // Do not cache mutations
    if (info.parentType.name === 'Mutation') {
      return undefined;
    }

    const { variables } = gqlContext.getArgs();
    const fieldName = info.fieldName;

    // Create a unique key based on field name and argument variables
    return `gql:${fieldName}:${JSON.stringify(variables)}`;
  }
}

export function provideGlobalCacheInterceptor(): Provider {
  return {
    provide: APP_INTERCEPTOR,
    useClass: GqlCacheInterceptor,
  };
}
