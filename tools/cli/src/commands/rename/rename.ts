import type { Command } from 'commander';
import { rename as fsRename, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

export type RenameParams = {
  target: string;
  recursive: boolean;
  extentions?: string[];
  before?: string;
  after?: string;
  undo?: boolean;
  placeholders?: string[];
  values?: string[];
};

export function rename(program: Command) {
  program
    .command('rename')
    .description('Rename multiple files based on file extentions')
    .option(
      '-e,--extentions <extentionss...>',
      'Include the files with the extentions only',
    )
    .option('-t,--target <string>', 'Target working directory', cwd())
    .option(
      '-p,--placeholders <placeholders...>',
      'List of placeholders to replace by value',
    )
    .option(
      '-v,--values <values...>',
      'List of values to be replaced by placeholder',
    )
    .option('-b,--before <string>', 'Prefix to add the file name')
    .option('-a,--after <string>', 'Suffix to add the file name')
    .option('-u,--undo', 'Undo the operation')
    .option('-r,--recursive', 'Include sub directories', false)
    .action(async (options: RenameParams) => {
      const {
        target,
        extentions,
        before,
        after,
        recursive,
        undo,
        placeholders,
        values,
      } = options;

      const dridents = await readdir(target, {
        recursive,
        withFileTypes: true,
      });

      const files = dridents
        .filter((e) => e.isFile())
        .filter((e) => {
          if (extentions) {
            return extentions.some((ex: string) => e.name.endsWith(ex));
          }
          return true;
        });

      for (const f of files) {
        const oldPath = join(f.parentPath, f.name);
        const oldFileName = f.name;

        let newFileName = oldFileName;

        if (undo) {
          if (before) {
            newFileName = newFileName.replace(new RegExp(`^${before}`), '');
          }

          if (after) {
            newFileName = newFileName.replace(new RegExp(`${after}$`), '');
          }

          if (placeholders && values) {
            if (
              placeholders.length > 0 &&
              placeholders.length === values.length
            ) {
              for (let i = 0; i < placeholders.length; i++) {
                newFileName = newFileName.replace(
                  new RegExp(`${values[i]}`, 'g'),
                  placeholders[i],
                );
              }
            } else {
              throw new Error(
                'Placeholders length does not match the values legnth',
              );
            }
          }
        } else {
          if (before) {
            newFileName = before + newFileName;
          }

          if (after) {
            newFileName = newFileName + after;
          }

          if (placeholders && values) {
            if (
              placeholders.length > 0 &&
              placeholders.length === values.length
            ) {
              for (let i = 0; i < placeholders.length; i++) {
                newFileName = newFileName.replace(
                  new RegExp(`${placeholders[i]}`, 'g'),
                  values[i],
                );
              }
            } else {
              throw new Error(
                'Placeholders length does not match the values legnth',
              );
            }
          }
        }

        if (newFileName !== oldFileName) {
          await fsRename(oldPath, join(f.parentPath, newFileName));
        }
      }
    });
}
