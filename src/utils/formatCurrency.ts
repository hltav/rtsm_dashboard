export function formatCurrency(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "";
  
  const num = typeof value === "string" ? Number(value) : value;

  if (isNaN(num)) return "";

  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}