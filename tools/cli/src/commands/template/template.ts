import { names } from '@aenode/names';
import type { Command } from 'commander';
import { readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

export function template(program: Command) {
  program
    .command('template')
    .description('Templatify the project files (ts,js, md, and json)')
    .requiredOption('-n,--name <string...>', 'Resource name')
    .action(async ({ name }) => {
      const dridents = await readdir(cwd(), {
        recursive: true,
        withFileTypes: true,
      });

      const files = dridents
        .filter((e) => e.isFile())
        .filter((e) => {
          return /\.(ts|js|md|json)$/.test(e.name);
        });

      for (const f of files) {
        const oldPath = join(f.parentPath, f.name);
        const oldFileName = f.name;
        const oldFileContent = await readFile(oldPath, { encoding: 'utf-8' });

        let newFileName = oldFileName;
        let newFileContent = oldFileContent;
        const resourceNames = (name as string[]).map((e: string) => names(e));

        for (const resourceName of resourceNames) {
          newFileName = newFileName.replaceAll(
            new RegExp(`${resourceName.fileName}`, 'g'),
            '__fileName__',
          );

          newFileContent = newFileContent.replace(
            new RegExp(`/${resourceName.fileName}`, 'g'),
            '/<%- fileName %>',
          );

          newFileContent = newFileContent.replace(
            new RegExp(`${resourceName.propertyName}`, 'g'),
            '<%- propertyName %>',
          );
          newFileContent = newFileContent.replace(
            new RegExp(`${resourceName.className}`, 'g'),
            '<%- className %>',
          );
        }

        newFileName = newFileName + '.template';
        const newFilePath = join(f.parentPath, newFileName);

        await rename(oldPath, newFilePath);

        await writeFile(newFilePath, newFileContent, { encoding: 'utf-8' });
      }
    });
}
