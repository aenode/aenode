import { input } from '@inquirer/prompts';
import { type Command } from 'commander';

export function project(program: Command) {
  program
    .command('project')
    .description('Generate projects')
    .option('-t, --type <string>', 'Project type')
    .option('-d, --directory <string>', 'Project name')

    .action(async ({ name }) => {
      if (!name) {
        name = await input({ message: 'What is your name?', required: true });
      }
      console.log(`Hello, ${name}`);
    });
}
