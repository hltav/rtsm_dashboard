export function formatOdd(value: string): string {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length === 0) return "";

  if (cleaned.length === 1) return cleaned;

  const integer = cleaned.slice(0, -2);
  const decimal = cleaned.slice(-2);

  return `${integer},${decimal}`;
}
