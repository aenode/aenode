import { program } from 'commander';
import { bye } from './commands/bye/bye.js';
import { hello } from './commands/hello/hello.js';

export function main() {
  hello(program);
  bye(program);
  program.parse();
}
