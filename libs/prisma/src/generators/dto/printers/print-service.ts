import { names } from '@aenode/names';
import type { DMMF } from '@prisma/generator-helper';
import { FieldMetadata } from '../../helpers/field-metadata.js';

export function printUpsertByMethod(
  modelName: string,
  field: DMMF.Field,
): string {
  const { pascal, camel } = names(field.name);

  return [
    `  async upsertOneBy${pascal}(data:${modelName}CreateDto ) {`,
    `    data = await this.beforeCreateAndUpdate(data);`,
    `    return await this.delegate.upsert({ where: { ${camel}: data.${camel}, isActive: true }, create: data, update: {} });`,
    `  }`,
  ].join('\n');
}

export function printFindUnqiueByMethod(field: DMMF.Field) {
  const { pascal, camel } = names(field.name);
  const meta = new FieldMetadata(field);
  const type = meta.tsType;

  return [
    `  findUniqueOneBy${pascal}(${camel}: ${type}) {`,
    `    return this.delegate.findUnique({ where: { ${camel}, isActive: true } });`,
    `  }`,
  ].join('\n');
}

export function printFindFirstByMethod(field: DMMF.Field) {
  const { pascal, camel } = names(field.name);
  const meta = new FieldMetadata(field);
  const type = meta.tsType;

  return [
    `  findFirstOneBy${pascal}(${camel}: ${type}) {`,
    `    return this.delegate.findFirst({ where: { ${camel}, isActive: true } });`,
    `  }`,
  ].join('\n');
}

export function __printFindCompositeUnqiueMethod(unqiueFields: DMMF.Field[]) {
  const methodNameSuffix = unqiueFields
    .map((e) => e.name)
    .map((e) => names(e).pascal)
    .join('And');
  const params = unqiueFields
    .map((e) => new FieldMetadata(e))
    .map((e) => `${e.name}: ${e.tsType}`)
    .join(', ');
  const paramsInName = unqiueFields.map((e) => e.name).join('_');
  const paramsInParam = unqiueFields.map((e) => e.name).join(', ');

  return [
    `  findUniqueOneBy${methodNameSuffix}(${params}) {`,
    `    return this.delegate.findUnique({ where: { ${paramsInName}: {${paramsInParam}}, isActive: true } });`,
    `  }`,
  ].join('\n');
}

export function printFindCompositeUnqiueMethod(model: DMMF.Model) {
  if (model.uniqueFields && model.uniqueFields.length > 0) {
    const content = [];
    for (const fieldNames of model.uniqueFields) {
      const fields = fieldNames.map((e) => {
        const found = model.fields.find((f) => f.name === e);
        if (!found) throw new Error('Field not found');
        return found;
      });
      content.push(__printFindCompositeUnqiueMethod(fields));
    }

    return content.join('\n');
  }

  return '';
}

export function printUpdateByMethod(modelName: string, field: DMMF.Field) {
  const { pascal, camel } = names(field.name);
  const meta = new FieldMetadata(field);
  const type = meta.tsType;

  return [
    `  async updateOneBy${pascal}(${camel}: ${type}, data: ${modelName}UpdateDto) {`,
    `    data = await this.beforeUpdate(await this.beforeCreateAndUpdate(data));`,
    `    return await this.delegate.update({ where: { ${camel}, isActive: true }, data });`,
    `  }`,
  ].join('\n');
}

export function printDeleteByMethods(field: DMMF.Field) {
  const { pascal, camel } = names(field.name);
  const meta = new FieldMetadata(field);
  const type = meta.tsType;

  return [
    `  recoverOneBy${pascal}(${camel}: ${type}) {`,
    `    return this.delegate.update({`,
    `      where: { ${camel}, isActive: false },`,
    `      data: { isActive: true },`,
    `    });`,
    `  }`,

    ``,
    `  softDeleteOneBy${pascal}(${camel}: ${type}) {`,
    `    return this.delegate.update({`,
    `      where: { ${camel}, isActive: true },`,
    `      data: { isActive: false },`,
    `    });`,
    `  }`,
    ``,
    `  hardDeleteOneBy${pascal}(${camel}: ${type}) {`,
    `    return this.delegate.delete({ where: { ${camel} } });`,
    `  }`,
  ].join('\n');
}

export function printIsExistMethod(model: DMMF.Model): string {
  const inputFields = model.fields
    .filter((e) => e.kind !== 'object' && !e.isList)
    .filter((e) => e.isUnique && !e.isId)
    .filter((e) => new FieldMetadata(e).isInputField);

  const compositeUniqueFields = model.uniqueFields.map((fields) =>
    fields.map((fn) => {
      const found = model.fields.find((e) => e.name === fn);

      if (!found) {
        throw new Error('not found');
      }
      return found;
    }),
  );

  const uniqueFieldsCheck = inputFields
    .map((field) => {
      const { pascal, camel } = names(field.name);
      return `data.${camel} && await this.findUniqueOneBy${pascal}(data.${camel}) && '${camel}'`;
    })
    .join(',');

  const compositeUniqueFieldsCheck = compositeUniqueFields
    .map((fields) => {
      const methodNameSuffix = fields
        .map((e) => e.name)
        .map((e) => names(e).pascal)
        .join('And');
      const params = fields
        .map((e) => new FieldMetadata(e))
        .map((e) => `data.${e.name}`)
        .join(', ');

      const checker = fields.map((e) => `data.${e.name}`).join('&&');

      const result = fields.map((e) => `'${e.name}'`).join(',');

      return `${checker} &&  await this.findUniqueOneBy${methodNameSuffix}(${params}) && [ ${result} ]`;
    })
    .join(',');

  if (uniqueFieldsCheck || compositeUniqueFieldsCheck) {
    return [
      `  async isUniqueExist(data: ${model.name}UpdateDto | ${model.name}CreateDto) {`,
      `    const result  = [ ${[uniqueFieldsCheck, compositeUniqueFieldsCheck].filter((d) => d).join(', ')}].filter(e=>e)`,
      `       .map((fieldName) => {
        return {
          constraint: 'isUnique',
          propery: fieldName,
          message: \`\${fieldName} should be unqiue\`,
        };
      });`,
      `    if(result.length > 0){`,
      `       return result`,
      `    }`,
      `    return undefined`,
      `  }`,
    ].join('\n');
  }
  return '';
}

export function printService(model: DMMF.Model) {
  const modelName = model.name;

  const ownFields = model.fields.filter(
    (e) =>
      !e.isList &&
      e.kind !== 'object' &&
      e.name !== 'isActive' &&
      e.name !== 'createdAt' &&
      e.name !== 'updatedAt',
  );

  const noneUniqueFields = ownFields.filter((e) => !(e.isUnique || e.isId));

  const uniqueFields = ownFields.filter((e) => e.isUnique || e.isId);

  const uniqueInputFields = uniqueFields.filter(
    (e) => new FieldMetadata(e).isInputField,
  );

  const findUnqiueOneMethods = uniqueFields
    .map((field) => printFindUnqiueByMethod(field))
    .join('\n');

  const findFirstOneMethods = noneUniqueFields
    .map((field) => printFindFirstByMethod(field))
    .join('\n');

  const updateByMethods = uniqueFields
    .map((field) => printUpdateByMethod(modelName, field))
    .join('\n');

  const deleteByMethods = uniqueFields
    .map((field) => printDeleteByMethods(field))
    .join('\n');

  const compositeUnqiueMethods = printFindCompositeUnqiueMethod(model);

  const upsertOneMethods = uniqueInputFields
    .map((field) => printUpsertByMethod(model.name, field))
    .join('\n');

  const isExistMethod = printIsExistMethod(model);

  return [
    `export class ${modelName}DelegateService {`,
    `  constructor(public readonly delegate: P.Prisma.${modelName}Delegate) {}`,
    ``,
    ``,
    ``,
    `  async createOne(data: ${modelName}CreateDto) {`,
    `    data = await this.beforeCreate(await this.beforeCreateAndUpdate(data));`,
    `    return await this.delegate.create({ data });`,
    `  }`,

    upsertOneMethods,
    findUnqiueOneMethods,
    findFirstOneMethods,
    `  findMany(query: ${modelName}FindManyDto) {`,
    `    return this.delegate.findMany(query);`,
    `  }`,

    compositeUnqiueMethods,
    updateByMethods,
    deleteByMethods,
    isExistMethod,

    `  protected async beforeUpdate(data: ${modelName}UpdateDto): Promise<${modelName}UpdateDto> {`,
    `    return data;`,
    `  }`,
    `  `,
    `  protected async beforeCreate(data: ${modelName}CreateDto): Promise<${modelName}CreateDto> {`,
    `    return data;`,
    `  }`,
    ``,
    `  protected async beforeCreateAndUpdate<T extends ${modelName}UpdateDto | ${modelName}CreateDto>(`,
    `    data: T,`,
    `  ): Promise<T> {`,
    `    return data;`,
    `  }`,

    `}`,
  ]
    .filter((e) => e)
    .join('\n');
}
