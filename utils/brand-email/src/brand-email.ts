export function brandEmail(email: string, brand: string): string {
  return email.split('@').join(`+${brand}@`);
}
