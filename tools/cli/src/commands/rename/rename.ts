import type { Command } from 'commander';
import { rename as fsRename, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

export function rename(program: Command) {
  program
    .command('rename')
    .description('Rename multiple files based on file extention')
    .option(
      '-e,--extention <extentions...>',
      'Include the files with the extention only',
    )
    .option('-t,--target <string>', 'Target working directory', cwd())
    .option('-p,--prefix <string>', 'Prefix to add the file name')
    .option('-s,--suffix <string>', 'Suffix to add the file name')
    .option('-u,--undo', 'Undo the operation')
    .option('-r,--recursive', 'Include sub directories')
    .action(async ({ target, extention, prefix, suffix, recursive, undo }) => {
      const dridents = await readdir(target, {
        recursive,
        withFileTypes: true,
      });

      const files = dridents
        .filter((e) => e.isFile())
        .filter((e) => {
          if (extention) {
            return extention.some((ex: string) => e.name.endsWith(ex));
          }
          return true;
        });

      for (const f of files) {
        const oldPath = join(f.parentPath, f.name);
        const oldFileName = f.name;

        let newFileName = oldFileName;

        if (undo) {
          if (prefix) {
            newFileName = newFileName.replace(new RegExp(`^${prefix}`), '');
          }

          if (suffix) {
            newFileName = newFileName.replace(new RegExp(`${suffix}$`), '');
          }
        } else {
          if (prefix) {
            newFileName = prefix + newFileName;
          }

          if (suffix) {
            newFileName = newFileName + suffix;
          }
        }

        if (newFileName !== oldFileName) {
          await fsRename(oldPath, join(f.parentPath, newFileName));
        }
      }
    });
}
