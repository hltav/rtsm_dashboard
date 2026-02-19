export const formatCurrency = (value: number | string): string  => {
  if (value === "" || value === null || value === undefined) return "";
  const numeric = typeof value === "string" ? Number(value) : value;
  if (isNaN(numeric)) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numeric);
};

// Adicione null e undefined na tipagem do parâmetro 'value'
export const returnCurrency = (value: number | string | null | undefined): string => {
  if (value === "" || value === null || value === undefined) return "";
  const numeric = typeof value === "string" ? Number(value) : value;
  if (isNaN(numeric)) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numeric);
};