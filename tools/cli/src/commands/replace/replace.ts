import type { Command } from 'commander';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

export function replace(program: Command) {
  program
    .command('replace')
    .description('Replace multiple files content based file extentions')
    .option(
      '-e,--extention <extentions...>',
      'Include the files with the extention only',
    )
    .option('-t,--target <string>', 'Target working directory', cwd())
    .option('-p,--placeholders <placeholders...>', 'placeholders')
    .option('-v,--values <values...>', 'New values')
    .option('-r,--recursive', 'Include sub directories')
    .action(async ({ extention, target, placeholders, values, recursive }) => {
      const dridents = await readdir(target, {
        recursive,
        withFileTypes: true,
      });

      const files = dridents
        .filter((e) => e.isFile())
        .filter((e) => {
          if (extention) {
            return e.name.endsWith(extention);
          }
          return true;
        });

      for (const f of files) {
        const filePath = join(f.parentPath, f.name);
        let fileContent = await readFile(filePath, { encoding: 'utf-8' });

        for (const [index, placeholder] of placeholders.entries()) {
          if (!values[index]) {
            throw new Error(
              `Value is not provided for ${placeholder} at index ${index}`,
            );
          }
          fileContent = fileContent.replace(
            new RegExp(placeholder, 'g'),
            values[index],
          );
        }

        await writeFile(filePath, fileContent);
      }
    });
}
