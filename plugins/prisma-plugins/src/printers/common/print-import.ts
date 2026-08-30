export function printImport(packageName: string, items: string[]) {
  return `import { ${items.join(', ')} } from '${packageName}';`;
}
