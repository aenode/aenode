import { names } from '@aenode/names';
import type { DMMF } from '@prisma/generator-helper';

export function printResolverModule(model: DMMF.Model) {
  const { pascal: className, kebab: fileName } = names(model.name);

  return [
    `import { Prisma } from '@aenode/iam-db/client';`,
    `import { Module } from '@aenode/nestjs';`,
    `import { PrismaModule } from '@aenode/prisma/pg';`,
    `import { ${className}Resolver } from './${fileName}.resolver.js';`,
    ``,
    `@Module({`,
    `  imports: [PrismaModule.forFeature([Prisma.ModelName.${className}])],`,
    `  providers: [${className}Resolver],`,
    `})`,
    `export class ${className}Module {}`,
  ].join('\n');
}
export function printResolverClass(model: DMMF.Model) {
  const modelName = model.name;

  return [
    `import { Prisma } from '@aenode/iam-db/client';`,
    `import * as Dtos from '@aenode/iam-db/dtos';`,
    `import {`,
    `  ArgsId,`,
    `  ArgsInput,`,
    `  ArgsQuery,`,
    `  Mutation,`,
    `  PubSub,`,
    `  Query,`,
    `  Resolver,`,
    `  Subscription,`,
    `} from '@aenode/nestjs/graphql';`,
    `import {  InjectDelegate } from '@aenode/prisma/pg';`,

    `@Resolver(() => Dtos.${modelName}ReadDto)`,
    `export class ${modelName}Resolver {`,
    `  protected readonly list: Partial<Dtos.${modelName}ReadDto>[] = [];`,
    `  protected readonly sub = new PubSub();`,

    `  constructor(`,
    `@InjectDelegate(Prisma.ModelName.${modelName})`,
    `protected readonly delegate: Prisma.${modelName}Delegate,`,
    `  ) {}`,

    `  @Query(() => [Dtos.${modelName}ReadDto], { nullable: true })`,
    `  protected findMany${modelName}(`,
    `@ArgsQuery(() => Dtos.${modelName}FindManyArgsDto)`,
    `query: Dtos.${modelName}FindManyArgsDto,`,
    `  ) {`,
    `return this.delegate.findMany(query);`,
    `  }`,

    `  @Query(() => Dtos.${modelName}ReadDto, { nullable: true })`,
    `  protected find${modelName}ById(`,
    `@ArgsId() id: number,`,
    `@ArgsQuery(() => Dtos.${modelName}FindOneArgsDto)`,
    `query: Dtos.${modelName}FindOneArgsDto,`,
    `  ) {`,
    `return this.delegate.findUnique({ ...query, where: { id } });`,
    `  }`,

    `  @Mutation(() => Dtos.${modelName}ReadDto)`,
    `  protected create${modelName}(`,
    `@ArgsInput(() => Dtos.${modelName}CreateDto) data: Dtos.${modelName}CreateDto,`,
    `@ArgsQuery(() => Dtos.${modelName}FindOneArgsDto)`,
    `query: Dtos.${modelName}FindOneArgsDto,`,
    `  ) {`,
    `return this.delegate.create({ ...query, data });`,
    `  }`,

    `  @Mutation(() => Dtos.${modelName}ReadDto)`,
    `  protected update${modelName}ById(`,
    `@ArgsId() id: number,`,
    `@ArgsInput(() => Dtos.${modelName}UpdateDto)`,
    `data: Dtos.${modelName}UpdateDto,`,
    `@ArgsQuery(() => Dtos.${modelName}FindOneArgsDto)`,
    `query: Dtos.${modelName}FindOneArgsDto,`,
    `  ) {`,
    `return this.delegate.update({ ...query, where: { id }, data });`,
    `  }`,

    `  @Mutation(() => Dtos.${modelName}ReadDto)`,
    `  protected delete${modelName}ById(`,
    `@ArgsId() id: number,`,
    `@ArgsQuery(() => Dtos.${modelName}FindOneArgsDto)`,
    `query: Dtos.${modelName}FindOneArgsDto,`,
    `  ) {`,
    `return this.delegate.delete({ ...query, where: { id } });`,
    `  }`,

    `  @Subscription(() => Dtos.${modelName}ReadDto)`,
    `  protected onCreated${modelName}() {`,
    `return this.sub.asyncIterableIterator('onCreate${modelName}');`,
    `  }`,

    `  @Subscription(() => Dtos.${modelName}ReadDto)`,
    `  protected onUpdated${modelName}() {`,
    `return this.sub.asyncIterableIterator('onUpdate${modelName}');`,
    `  }`,
    `}`,
  ].join('\n');
}

export function printResourceModule(models: DMMF.Model[]) {
  const modules = models.map((m) => `${m.name}Module`).join(',');
  const imports = models
    .map((m) => names(m.name))
    .map(
      (n) =>
        `import { ${n.pascal}Module } from './${n.kebab}/${n.kebab}.module.js';`,
    )
    .join('\n');
  return [
    `import { Module } from "@aenode/nestjs";`,
    imports,
    ``,
    `@Module({ `,
    `    imports: [ ${modules} ]`,
    `})`,
    `export class ResourceModule { }`,
  ].join('\n');
}
