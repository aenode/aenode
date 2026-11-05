import { extractResourceName, names } from '@aenode/names';

export function operationSummary(...args: Parameters<MethodDecorator>): string {
  const resourceName = extractResourceName(args[0].constructor.name);
  const operationName = args[1].toString();
  return `${names(operationName).sentence} ${names(resourceName).pascal}`;
}
