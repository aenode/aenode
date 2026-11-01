import type { Command } from 'commander';
import { execSync } from 'node:child_process';
import { clearLogs, readLogs } from '../../log/log.js';

export function history(program: Command) {
  program
    .command('history')
    .description('Manage history')
    .option('-c,--clear', 'Clean up the history log')
    .option('-r,--run <number>', 'Run command from history by index')
    .action(async ({ clear, run }) => {
      if (clear === true) {
        await clearLogs();
        return;
      }
      const logs = await readLogs();

      if (run && run > 0) {
        const command = logs.split('\n')[(run as number) - 1];

        if (command) {
          const logParts = command.split(' ');

          const cleanCommand = logParts
            .slice(1, logParts.length - 1)
            .join(' ')
            .trim();

          console.log('Command:  ', cleanCommand);
          if (cleanCommand) {
            execSync(cleanCommand, { stdio: 'inherit' });
          }
        } else {
          throw new Error(`History does not have ${run} index`);
        }
      }

      console.log(logs);
    });
}
