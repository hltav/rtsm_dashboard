import { SafeImage } from "@/components/SafeImage";
export const renderLeagueWithBadge = (
  leagueName: string,
  strBadge?: string | null,
  options?: {
    badgeSize?: number;
    gap?: string;
    className?: string;
  }
) => {
  const { badgeSize = 30, gap = "8px", className = "" } = options || {};

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap }}
      className={className}
    >
      {strBadge && (
        <SafeImage
          src={strBadge}
          alt={`${leagueName} badge`}
          width={badgeSize}
          height={badgeSize}
        />
      )}
      <span>{leagueName}</span>
    </div>
  );
};
