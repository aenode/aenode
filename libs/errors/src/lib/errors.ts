export class BaseCustomError extends Error {
  public readonly code: string;
  public readonly extras: unknown[];
  constructor(code: string, message?: string, ...extras: unknown[]) {
    super(message ?? code);
    this.name = this.constructor.name;
    this.code = code;
    // Restores proper prototype chain in V8 environments
    Object.setPrototypeOf(this, new.target.prototype);
    this.extras = extras;
  }
}

const ERROR_PREFIX = [
  'Required',
  'Null',
  'Undefined',
  'EmptyString',
  'EmptyArray',
  'InvalidInput',
  'AccessDenied',
  'MinLength',
  'MaxLength',
  'Pattern',
  'AccessDenied',
] as const;

type ErrorClassName<T extends string> = `${T}Error`;

/**
 * Dynamically constructs error class constructors based on string prefixes.
 */
export function createErrorClasses<T extends readonly string[]>(
  prefixes: T,
): {
  [K in T[number] as ErrorClassName<K>]: new (
    message?: string,
    ...extras: unknown[]
  ) => BaseCustomError;
} {
  const errorMap = {} as Record<
    string,
    new (message?: string) => BaseCustomError
  >;

  for (const prefix of prefixes) {
    const className = `${prefix}Error`;

    // Create a named class dynamically using object shorthand
    const DynamicClass = {
      [className]: class extends BaseCustomError {
        constructor(message?: string) {
          super(prefix, message);
        }
      },
    }[className];

    if (errorMap) {
      (errorMap as any)[className] = DynamicClass;
    }
  }

  return errorMap as any;
}

// Instantiate the classes map
export const Errors = createErrorClasses(ERROR_PREFIX);

export const {
  EmptyArrayError,
  EmptyStringError,
  InvalidInputError,
  NullError,
  RequiredError,
  UndefinedError,
  AccessDeniedError,
  MaxLengthError,
  MinLengthError,
  PatternError,
} = Errors;
