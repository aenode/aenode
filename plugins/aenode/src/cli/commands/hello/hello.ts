import { input } from '@inquirer/prompts';
import { type Command } from 'commander';
export function hello(program: Command) {
  program
    .command('hello')
    .option('-n, --name <string>', 'Required name')

    .action(async ({ name }) => {
      if (!name) {
        name = await input({ message: 'What is your name?', required: true });
      }
      console.log(`Hello, ${name}`);
    });
}
