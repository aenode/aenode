export function applyDecorators<
  Decorator extends ((...args: any[]) => unknown) &
    (PropertyDecorator | ClassDecorator | MethodDecorator | ParameterDecorator),
>(...decorators: Decorator[]): Decorator {
  return ((...args: unknown[]) => {
    decorators.forEach((d) => d(...args));
  }) as unknown as Decorator;
}
