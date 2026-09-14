import { files, scope } from '@aenode/fs';
import { output } from '@nx/devkit';
import { type Command } from 'commander';
import fs from 'node:fs/promises';
import { relative } from 'node:path';
import { cwd } from 'node:process';


export type RenameOptions = {
  placeholder: string;
  value: string;
  recursive: boolean
}
export function rename(program: Command) {
  return program
    .command('rename')
    .description('Rename files names by given placeholder and new value')
    .requiredOption('-p, --placeholder <string>', 'Placeholder')
    .requiredOption('-v, --value <string>', 'New value')
    .option('-r, --recursive', 'Include sub directories', false)

    .action(async (options: RenameOptions) => {

      if (options.value.includes('=')) { throw new Error("Filename cannot contain = symbol!") }

      const { placeholder, recursive, value } = options
      const changes: [string, string, string][] = [];
      const resolve = scope(cwd());



      visitingFiles: for await (const file of files(cwd(), { recursive })) {
        if (file.isFile()) {
          const newFileName = file.name.split(placeholder).join(value);

          if (file.name === newFileName) {
            continue visitingFiles;
          }

          const oldAbsolutePath = resolve(file.parentPath, file.name);
          const newAbsolutePath = resolve(file.parentPath, newFileName);

          changes.push([
            output.colors.green('[Renamed]'),
            oldAbsolutePath,
            newAbsolutePath,
          ]);
        }
      }

      for (const [, oldname, newname] of changes) {
        await fs.rename(oldname, newname);
      }

      if (changes.length > 0) {
        output.success({
          title: 'aenode rename',
          bodyLines: changes.map(([operation, oldValue, newValue]) => {
            oldValue = relative(cwd(), oldValue);
            newValue = relative(cwd(), newValue);

            return `${operation} ${output.colors.gray(oldValue)} -> ${output.colors.orange(newValue)}`;
          }),
        });
      } else {
        output.warn({ title: 'Nothing changed' });
      }
    });
}
