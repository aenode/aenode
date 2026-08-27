import { program } from 'commander';
import { bye } from './commands/bye/bye.js';
import { hello } from './commands/hello/hello.js';
import { rename } from './commands/rename/rename.js';

export function main() {
  program.name('aenode').description('Aenode | CLI').version('0.0.4');

  hello(program);
  bye(program);
  rename(program);

  program.parse();
}
