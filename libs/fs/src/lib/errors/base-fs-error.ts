export interface FSErrorOptions extends ErrorOptions {
  /** Path involved in the failed operation */
  path?: string;
}

export class BaseFSError extends Error {
  readonly path?: string;

  constructor(message: string, options: FSErrorOptions = {}) {
    const { path, ...errorOptions } = options;
    super(message, errorOptions); // passes `cause` through (es2022)

    // Keeps the subclass name in stack traces and logs
    this.name = new.target.name;
    this.path = path;

    // Needed only if you ever compile below ES2015; harmless otherwise
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      path: this.path,
    };
  }
}
