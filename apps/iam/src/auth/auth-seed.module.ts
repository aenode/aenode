import { ConfigModule, ConfigService, names } from '@aenode/nest';
import { CryptoModule, CryptoService } from '@aenode/nest-crypto';
import { InjectPrismaClient } from '@aenode/prisma';
import { Module, type OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '../generated/prisma/client.js';

@Module({
  imports: [ConfigModule, CryptoModule.register()],
})
export class AuthSeedModule implements OnModuleInit {
  constructor(
    @InjectPrismaClient() protected readonly client: PrismaClient,
    protected readonly config: ConfigService,
    protected readonly crypto: CryptoService,
  ) {}

  async seed() {
    const username = this.config.getOrThrow('ROOT_USERNAME');
    const password = this.config.getOrThrow('ROOT_PASSWORD');

    this.client.$transaction(async (client) => {
      // Create the root user
      const hashedPassword = await this.crypto.hash(password);
      await client.user.upsert({
        where: { username },
        create: { username, password: hashedPassword },
        update: { isActive: true },
      });

      // Create scope
      const scope = await client.scope.upsert({
        where: { name: 'iam' },
        create: { name: 'iam' },
        update: { isActive: true },
      });

      // Create resources
      const modelNames = Object.values(Prisma.ModelName).map(
        (e) => names(e).snake,
      );
      const cratedResources: Prisma.ResourceModel[] = [];
      for (const name of modelNames) {
        const created = await client.resource.upsert({
          where: { name, scopeId: scope.id },
          create: { name, scopeId: scope.id },
          update: { isActive: true },
        });

        cratedResources.push(created);
      }

      const operations = [
        'create_one',
        'create_many',
        'create_own',
        'read_one',
        'read_many',
        'read_own',
        'upate_one',
        'upate_many',
        'upate_own',
        'delete_one',
        'delete_many',
        'delete_own',
      ];

      // Create oprations
      for (const name of operations) {
        const operation = await client.operation.upsert({
          where: { name },
          create: { name },
          update: { isActive: true },
        });

        // Create permissions
        for (const resource of cratedResources) {
          //
          await client.permission.upsert({
            where: {
              resourceId_operationId: {
                operationId: operation.id,
                resourceId: resource.id,
              },
            },
            create: { operationId: operation.id, resourceId: resource.id },
            update: { isActive: true },
          });
        }
        //
      }
    });
  }

  async onModuleInit() {
    await this.seed();
  }
}
