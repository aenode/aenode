import type { Command } from 'commander';

export function bye(program: Command) {
  program
    .command('bye')
    .requiredOption('-u,--username <string>', 'Say bye to user')
    .action(({ username }) => {
      console.log(`Bye, ${username}`);
    });
}
