import { inspect } from 'node:util';

type LoggerOptions = {
  context: string;
};

const RESET_COLOR = '\x1b[0m';

// ANSI color escape codes
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
} as const;

type ColorFunctions = Record<keyof typeof colors, (msg: string) => string>;

type ColorFn = (msg: string) => string;

function colorFunctions(): ColorFunctions {
  return Object.entries(colors).reduce(
    (acc, [colorName, colorCode]) => {
      acc[colorName] = (msg: string) => `${colorCode}${msg}${RESET_COLOR}`;
      return { ...acc };
    },
    {} as Record<string, (msg: string) => string>,
  ) as ColorFunctions;
}

export class Logger {
  private readonly colors = colorFunctions();

  constructor(protected readonly options: LoggerOptions) {}

  private get context() {
    return `[ ${this.options.context} ]`;
  }

  private formatArgs(...interpolationArgs: unknown[]) {
    if (interpolationArgs.length === 0) {
      return '';
    }
    return interpolationArgs.map((arg) => {
      if (typeof arg === 'object' && arg !== null) {
        return inspect(arg, {
          colors: true,
          depth: null,
          compact: false,
        });
      }
      return arg;
    });
  }

  private print(colorFn: ColorFn, mesage: unknown, ...args: unknown[]): Logger {
    if (/prod/i.test(process.env.NODE_ENV ?? '')) {
      return this;
    }

    const stack = this.stack();
    const fMessage = `${colorFn(this.context)} ${mesage}\t`;
    if (args.length > 0) {
      console.log(fMessage, ...this.formatArgs(args), stack);
    } else {
      console.log(fMessage, stack);
    }
    return this;
  }

  private stack() {
    // 1. Capture the stack trace
    const err = new Error();

    const stackLines = err.stack?.split('\n') || [];

    const callerLine = stackLines[4] || '';

    // 2. Extract file path and line number using regex or string parsing
    // Matches formats like: at Object.<anonymous> (/path/to/file.ts:15:11) or at /path/to/file.ts:15:11
    const match =
      callerLine.match(/\((.*):(\d+):(\d+)\)$/) ||
      callerLine.match(/at\s+(.*):(\d+):(\d+)$/);

    let path = 'unknown';
    let line = '0';

    if (match) {
      path = match[1]!;
      line = match[2]!;
    }

    return `${path}:${line}`;
  }

  log(msg: string, ...args: unknown[]) {
    return this.print(this.colors.green, msg, ...args);
  }

  info(msg: string, ...args: unknown[]) {
    return this.print(this.colors.green, msg, ...args);
  }

  warn(msg: string, ...args: unknown[]) {
    return this.print(this.colors.yellow, msg, ...args);
  }

  error(msg: string, ...args: unknown[]) {
    return this.print(this.colors.red, msg, ...args);
  }

  debug(msg: string, ...args: unknown[]) {
    return this.print(this.colors.blue, msg, ...args);
  }
}
