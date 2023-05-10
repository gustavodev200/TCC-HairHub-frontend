export function formatPhoneNumber(value: string): string {
  return value.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
}
