import {
  Module,
  type DynamicModule,
  type Provider,
  type Type,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { __DEFAULT__ } from './__constants.js';
import { getClientToken, provideClient } from './provide-client.js';
import { getDelegateToken, provideDelegate } from './provide-delegate.js';

@Module({
  imports: [ConfigModule],
})
export class PrismaModule {
  static forRoot(client: Type, name = __DEFAULT__): DynamicModule {
    return {
      module: PrismaModule,
      global: true,
      providers: [provideClient(name, client)],
      exports: [getClientToken(name)],
    };
  }

  static forFeature(
    modelNames: string[],
    name: string = __DEFAULT__,
  ): DynamicModule {
    const providers = modelNames.map((modelName) => {
      return [
        provideDelegate(modelName, name),
        getDelegateToken(modelName, name),
      ] as [DelegateProvider: Provider, Token: string];
    });

    return {
      module: PrismaModule,
      providers: [...providers.map(([delegate]) => delegate)],
      exports: [...providers.map(([, token]) => token)],
    };
  }
}
