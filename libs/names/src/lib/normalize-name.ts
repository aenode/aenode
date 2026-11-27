/**
 * Transform the {@link name} into kebab-case
 *
 * @param name
 */
export function normalizeName(name: string): string {
  return name
    .replace(/\s{1,}/g, ' ')
    .trim()
    .replace(/\s{1,}/g, '-')
    .replace(/-{1,}/g, '-')
    .replace(/_{1,}/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}
