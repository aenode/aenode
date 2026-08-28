import { Env } from '@aenode/env';
import { Module, type DynamicModule, type Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getClientToken, provideClient } from './client.provider.js';
import { getDelegateToken, provideDelegate } from './delegate.provider.js';

@Module({
  imports: [ConfigModule],
})
export class PrismaModule {
  static forRoot(prismaClient: Type, name = Env.DEFAULT): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [provideClient(prismaClient, name)],
      exports: [getClientToken(name)],
    };
  }

  static forFeature(models: string[], name = Env.DEFAULT): DynamicModule {
    const delegateProviders = models.map((modelName) =>
      provideDelegate(modelName, name),
    );
    const delegateTokens = models.map((modelName) =>
      getDelegateToken(modelName, name),
    );

    return {
      module: PrismaModule,
      providers: [...delegateProviders],
      exports: [...delegateTokens],
    };
  }
}
