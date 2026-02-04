// Detecta o timezone do navegador do usuário
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Formata data no timezone local do usuário
export function formatToLocalTime(
  utcDate: string | Date | null | undefined, // Tipagem flexível
  options?: Intl.DateTimeFormatOptions
): string {
  if (!utcDate) return "Data não disponível"; // Retorno amigável

  const date = typeof utcDate === "string" ? new Date(utcDate) : utcDate;

  // Verifica se a data criada é válida
  if (isNaN(date.getTime())) return "Data inválida";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  };

  return new Intl.DateTimeFormat("pt-BR", defaultOptions).format(date);
}
