import { writeTextFile } from '@aenode/fs';
import { names } from '@aenode/names';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { join } from 'node:path';
import {
  printResolverClass,
  printResolverModule,
} from '../printers/print-resolver.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (!output) throw new Error('output is required!');

  const models = options.dmmf.datamodel.models;

  for (const model of models) {
    Resolver: {
      const code = printResolverClass(model);
      const { kebab } = names(model.name);
      await writeTextFile(join(output, kebab, `${kebab}.resolver.ts`), code);

      break Resolver;
    }

    Module: {
      const code = printResolverModule(model);
      const { kebab } = names(model.name);
      await writeTextFile(join(output, kebab, `${kebab}.module.ts`), code);
      break Module;
    }
  }
}
