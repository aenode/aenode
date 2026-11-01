import { Option, type Command } from 'commander';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { finished, pipeline } from 'node:stream/promises';

export function merge(program: Command) {
  program
    .command('merge')
    .description('Merge files into the target file')

    .requiredOption('-s,--source <paths...>', 'Source file paths')
    .requiredOption('-d,--destination <path>', 'Destination file path')
    .addOption(
      new Option('-t,--type <string>', 'File type')
        .choices(['json', 'txt'])
        .default('txt'),
    )
    .action(async ({ source, destination, type }) => {
      await mkdir(dirname(destination), { recursive: true });

      const out = createWriteStream(destination);

      if (type === 'json') {
        out.write('[\n');
      }

      try {
        for (const [i, s] of source.entries()) {
          await pipeline(createReadStream(s), out, { end: false });
          if (type === 'json' && i < source.length - 1) {
            out.write(',');
          }
        }
      } finally {
        if (type === 'json') {
          out.write('\n]');
        }
        out.end();
      }

      await finished(out);
    });
}
