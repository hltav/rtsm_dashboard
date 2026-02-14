import { LogoSource } from "@/lib/api/events/favoriteLeaguesApi";

export function inferLogoSource(logo?: string | null): LogoSource | undefined {
  if (!logo) return undefined;

  if (logo.startsWith("/")) return "LOCAL";
  if (logo.startsWith("https://")) return "EXTERNAL";

  return undefined; // deixa falhar no backend se vier algo estranho
}