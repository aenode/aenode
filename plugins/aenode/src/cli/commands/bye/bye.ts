import { type Command } from 'commander';

export function bye(program: Command) {
  program
    .command('bye')
    .requiredOption('-n, --name <string>')
    .action(({ name }) => {
      console.log(`bye, ${name}`);
    });
}
