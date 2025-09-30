export const formatCurrency = (value: number | string): string => {
  if (value === "" || value === null || value === undefined) return "";
  const numeric = typeof value === "string" ? Number(value) : value;
  if (isNaN(numeric)) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numeric);
};
