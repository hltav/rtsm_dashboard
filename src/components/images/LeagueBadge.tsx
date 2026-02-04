
import { JSX } from "react";
import { SafeImage } from "./SafeImage";

export const renderLeagueWithBadge = (
  leagueName: string,
  strBadge?: string | null,
  options?: {
    badgeSize?: number;
    gap?: string;
    className?: string;
  }
): JSX.Element => {
  const { badgeSize = 30, gap = "12px", className = "" } = options || {};

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap }}
      className={className}
    >
      <SafeImage
        src={strBadge}
        alt={``}
        width={badgeSize}
        height={badgeSize}
        className="rounded-sm shadow-sm"
        style={{ objectFit: "contain" }}
      />
      <span style={{ fontWeight: 500 }}>{leagueName}</span>
    </div>
  );
};
