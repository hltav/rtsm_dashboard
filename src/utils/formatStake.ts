export function formatStake(value: string): string {
  if (!value) return "";
  // Permite números, ponto e vírgula
  const cleaned = value.replace(/[^\d.,]/g, "");
  // Normaliza para ponto
  const normalized = cleaned.replace(",", ".");
  const parts = normalized.split(".");
  const integer = parts[0];
  const decimal = parts[1]?.slice(0, 2);

  return decimal !== undefined ? `${integer},${decimal}` : integer;
}
