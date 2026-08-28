import { program } from 'commander';
import { bye } from './commands/bye/bye.js';
import { hello } from './commands/hello/hello.js';
import { rename } from './commands/rename/rename.js';
import { replace } from './commands/replace/replace.js';

export function main() {
  program.name('aenode').description('Aenode | CLI').version('0.0.6');

  // Commands
  [
    hello,
    bye,
    rename,
    replace,
    //
  ].forEach((d) => d(program));

  program.showHelpAfterError().parse();
}
