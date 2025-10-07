export const parseCurrency = (value: string): number => {
  if (!value) return 0;
  const cleaned = value.replace(/\D/g, "");
  if (!cleaned) return 0;
  return Number(cleaned) / 100;
};
