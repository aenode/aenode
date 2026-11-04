import { names } from '@aenode/names';
import { Module, type DynamicModule, type Type } from '@aenode/nest/common';
import type { PrismaClient } from '@prisma/client/extension';
import {
  getPrismaClientToken,
  providePrismaClient,
} from './prisma-client.provider.js';
import {
  getPrismaDelegateToken,
  providePrismaDelegate,
} from './prisma-delegate.provider.js';

@Module({})
export class PrismaClientModule {
  static register(
    prismaClient: Type<PrismaClient>,
    scope?: string,
  ): DynamicModule {
    return {
      module: PrismaClientModule,
      global: true,
      providers: [providePrismaClient(prismaClient, scope)],
      exports: [getPrismaClientToken(scope)],
    };
  }

  static feature(modelNames: string[], scope?: string): DynamicModule {
    const providers = modelNames
      .map((modelName) => names(modelName).camel)
      .map((modelName) => {
        return providePrismaDelegate(modelName, scope);
      });

    const exportTokens = modelNames
      .map((modelName) => names(modelName).camel)
      .map((modelName) => {
        return getPrismaDelegateToken(modelName, scope);
      });

    return {
      module: PrismaClientModule,
      providers: [...providers],
      exports: [...exportTokens],
    };
  }
}
