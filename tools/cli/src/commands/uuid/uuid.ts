import { Option, type Command } from 'commander';
import { v4, v7 } from 'uuid';

export function uuid(program: Command) {
  program
    .command('uuid')
    .addOption(
      new Option('-t,--type <string>', 'UUID type').choices(['4', '7']),
    )
    .action(({ type }) => {
      switch (type) {
        case '7': {
          console.log(v7());
          break;
        }
        default: {
          console.log(v4());
          break;
        }
      }
    });
}
