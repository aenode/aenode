import { type Command } from 'commander';
import fs from 'node:fs/promises';
import { cwd } from 'node:process';

export function rename(program: Command) {
  program
    .command('rename')
    .description('Rename files names by given placeholder and new value')

    .requiredOption('-p, --placeholder <string>', 'Placeholder')
    .requiredOption('-v, --value <string>', 'New value')
    .option('-r, --recursive', 'Include sub directories', false)
    .action(async ({ placeholder, value, recursive }) => {
      const dirs = await fs.readdir(cwd(), { recursive });

      console.table({
        placeholder,
        value,
        recursive,
      });
      for (const dir of dirs) {
        if ((await fs.stat(dir)).isFile()) {
          console.log(`Renaming: ${dir}`);
        }
      }
    });
}
