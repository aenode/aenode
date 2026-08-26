import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { ApolloDriver } from '@nestjs/apollo';
import { type DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from './common.module.js';
import { provdeGlobalInputValidationPipe } from './global-validation-pipe.js';
import { provideGlobalCacheInterceptor } from './gql-cache.interceptor.js';

@Module({
  imports: [
    CommonModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [
    provdeGlobalInputValidationPipe(),
    provideGlobalCacheInterceptor(),
  ],
})
export class AppModule {
  static register(options: Omit<DynamicModule, 'module'>): DynamicModule {
    return {
      ...options,
      module: AppModule,
    };
  }
}
