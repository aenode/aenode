import { InvalidInputError } from '@aenode/errors';
import { files, scope, updateTextFile } from '@aenode/fs';
import { output } from '@nx/devkit';
import { type Command } from 'commander';
import { cwd } from 'node:process';

export function replace(program: Command) {
  return program
    .command('replace')
    .description('Replace content placeholder with the value')
    .requiredOption('-p, --placeholders <string...>', 'Placeholders')
    .requiredOption('-v, --values <string...>', 'New values')
    .option('-r, --recursive', 'Include sub directories', false)
    .option('-d, --dry-run', 'Dry run', false)

    .action(async ({ placeholders, values, recursive, dryRun }) => {
      if (placeholders.length !== values.length) {
        throw new InvalidInputError(
          `Each placeholder must have a repalcement but found ${placeholders} and ${values}`,
        );
      }

      const changes = new Map<string, string>();

      const UPDATED = output.colors.green('UPDATED');
      const SKIP = output.colors.green('SKIP');

      const resolve = scope(cwd());

      for await (const file of files(cwd(), { recursive })) {
        if (file.isFile()) {
          const filePath = resolve(file.parentPath, file.name);
          changes.set(filePath, SKIP);
        }
      }

      // Pair placeholder with replacement
      const entries: [placeholder: string, replacement: string][] = (
        placeholders as string[]
      ).map((p, index) => [p, values[index]]);

      for (const [filepath] of changes) {
        await updateTextFile(filepath, (text) => {
          let newText = text;
          for (const [p, v] of entries) {
            newText = newText.replaceAll(p, () => v);
          }

          if (text !== newText) {
            changes.set(filepath, UPDATED);
          }

          if (dryRun === true) {
            return text;
          }
          return newText;
        });
      }

      if (changes.size > 0) {
        output.success({
          title: `aenode replace | Updated files${dryRun ? ' (DryRun)' : ''}`,
          bodyLines: [...changes.entries()].map(
            ([filepath, operation]) => `${operation} ${filepath}`,
          ),
        });
      } else {
        output.warn({
          title: `aenode replace | Nothing changed${dryRun ? ' (DryRun)' : ''}`,
        });
      }
    });
}
