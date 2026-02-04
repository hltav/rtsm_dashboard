/**
 * Formata a data do evento para exibição
 * eventDate já vem em horário de Brasília do backend
 */



export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

const USER_TZ = getUserTimezone();

export function formatEventDate(
  eventDate: string | null | undefined,
  format: "short" | "long" | "full" = "short"
): string {
  if (!eventDate) return "Data não disponível";

  try {
    const date = new Date(eventDate);
    if (isNaN(date.getTime())) return "Data inválida";

    const optionsBase = {
      timeZone: USER_TZ,
      hour: "2-digit" as const,
      minute: "2-digit" as const,
    };

    switch (format) {
      case "short":
        return new Intl.DateTimeFormat("pt-BR", {
          ...optionsBase,
          day: "2-digit",
          month: "2-digit",
        }).format(date);

      case "long":
        return new Intl.DateTimeFormat("pt-BR", {
          ...optionsBase,
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
          .format(date)
          .replace(",", " às");

      case "full":
        return new Intl.DateTimeFormat("pt-BR", {
          ...optionsBase,
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
          .format(date)
          .replace(",", " às");

      default:
        return new Intl.DateTimeFormat("pt-BR", {
          ...optionsBase,
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date);
    }
  } catch {
    return "Data inválida";
  }
}
/**
 * Retorna se o evento é hoje, amanhã ou a data
 */
export function getRelativeEventDate(
  eventDate: string | null | undefined
): string {
  if (!eventDate) return "Data não disponível";

  try {
    const date = new Date(eventDate);
    if (isNaN(date.getTime())) return "Data inválida";

    const now = new Date();
    const formatterDate = new Intl.DateTimeFormat("pt-BR", {
      timeZone: USER_TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const formatterTime = new Intl.DateTimeFormat("pt-BR", {
      timeZone: USER_TZ,
      hour: "2-digit",
      minute: "2-digit",
    });

    const nowParts = formatterDate.formatToParts(now);
    const dateParts = formatterDate.formatToParts(date);

    const todayKey = nowParts.map(p => p.value).join("");
    const eventKey = dateParts.map(p => p.value).join("");

    const diffDays =
      Math.round(
        (new Date(eventKey).getTime() - new Date(todayKey).getTime()) /
          (1000 * 60 * 60 * 24)
      ) || 0;

    const timeStr = formatterTime.format(date);

    if (diffDays === 0) return `Hoje às ${timeStr}`;
    if (diffDays === 1) return `Amanhã às ${timeStr}`;
    if (diffDays === -1) return `Ontem às ${timeStr}`;

    if (diffDays > 1 && diffDays <= 7) {
      const weekday = new Intl.DateTimeFormat("pt-BR", {
        timeZone: USER_TZ,
        weekday: "long",
      }).format(date);
      return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)} às ${timeStr}`;
    }

    return formatEventDate(eventDate, "short");
  } catch {
    return "Data inválida";
  }
}

/**
 * Verifica se o evento já aconteceu
 */
export function isEventPast(eventDate: string | null | undefined): boolean {
  if (!eventDate) return false;
  try {
    const now = new Date();
    const date = new Date(eventDate);
    return date.getTime() < now.getTime();
  } catch {
    return false;
  }
}

/**
 * Verifica se o evento é ao vivo (±2h do horário atual)
 */
export function isEventLive(eventDate: string | null | undefined): boolean {
  if (!eventDate) return false;
  try {
    const now = new Date();
    const date = new Date(eventDate);
    const diffMinutes = (date.getTime() - now.getTime()) / (1000 * 60);
    return diffMinutes >= -120 && diffMinutes <= 120;
  } catch {
    return false;
  }
}

/**
 * Retorna informações completas do horário do evento
 */
export function getEventTimezoneInfo(event: {
  eventDate?: string | null;
  strTimeLocal?: string | null;
  strCountry?: string | null;
}) {
  return {
    brasilia: event.eventDate ? formatEventDate(event.eventDate, "long") : null,
    relative: event.eventDate ? getRelativeEventDate(event.eventDate) : null,
    isPast: event.eventDate ? isEventPast(event.eventDate) : false,
    isLive: event.eventDate ? isEventLive(event.eventDate) : false,
    local:
      event.strTimeLocal && event.strCountry
        ? `${event.strTimeLocal} (${event.strCountry})`
        : null,
  };
}

/**
 * Agrupa eventos por data (no horário de Brasília)
 */
export function groupEventsByDate(
  events: Array<{ eventDate?: string | null }>
) {
  const groups: Record<string, typeof events> = {};

  events.forEach(event => {
    if (!event.eventDate) {
      (groups["sem-data"] ||= []).push(event);
      return;
    }

    try {
      const date = new Date(event.eventDate);
      const dateKey = new Intl.DateTimeFormat("en-CA", {
        timeZone: USER_TZ,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(date)
        .replace(/\//g, "-"); // yyyy-mm-dd
      (groups[dateKey] ||= []).push(event);
    } catch {
      (groups["data-invalida"] ||= []).push(event);
    }
  });

  return groups;
}

/**
 * Formata a chave da data do grupo para exibição
 */
export function formatGroupDate(dateKey: string): string {
  if (dateKey === "sem-data") return "Sem data definida";
  if (dateKey === "data-invalida") return "Data inválida";

  try {
    const date = new Date(dateKey + "T00:00:00");
    const now = new Date();
    const diffDays = Math.round(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Amanhã";
    if (diffDays === -1) return "Ontem";

    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: USER_TZ,
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);
  } catch {
    return dateKey;
  }
}

/**
 * Formata apenas a hora (sempre em Brasília)
 */
export function formatTime(eventDate: string | null | undefined): string {
  if (!eventDate) return "--:--";
  try {
    const date = new Date(eventDate);
    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: USER_TZ,
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "--:--";
  }
}

/**
 * Formata apenas a data (sempre em Brasília)
 */
export function formatDate(eventDate: string | null | undefined): string {
  if (!eventDate) return "--/--/----";
  try {
    const date = new Date(eventDate);
    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: USER_TZ,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch {
    return "--/--/----";
  }
}