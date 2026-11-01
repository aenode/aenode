import { program } from 'commander';
import { bye } from './commands/bye/bye.js';
import { history } from './commands/history/history.js';
import { merge } from './commands/merge/merge.js';
import { rename } from './commands/rename/rename.js';
import { replace } from './commands/replace/replace.js';
import { uuid } from './commands/uuid/uuid.js';
import { writeLog } from './log/log.js';

[bye, merge, history, uuid, rename, replace].forEach((e) => e(program));

const aenode = program.name('aenode').description('aenode cli');

aenode.hook('postAction', (command, action) => {
  const options = Object.entries(action.opts())
    .map(([k, v]) => `--${k} "${v}"`)
    .join(' ');
  writeLog(`${command.name()} ${action.name()} ${options}`);
});

aenode.parse();
