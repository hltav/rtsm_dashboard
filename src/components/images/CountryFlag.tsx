import { SafeImage } from "@/components/images/SafeImage";
import { JSX } from "react";

export const renderCountryFlag = (
  country: string,
  flagUrl: string | null | undefined,
  options?: { size?: number; showName?: boolean; className?: string }
): JSX.Element => {
  const { size = 20, showName = true, className = "" } = options || {};

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
      className={className}
    >
      <SafeImage
        src={flagUrl}
        alt={" "}
        width={size}
        height={size} // usa o mesmo valor para manter proporção
        className="rounded-sm shadow-sm"
        style={{ objectFit: "cover" }} // forma correta de aplicar object-fit
      />
      {showName && (
        <span style={{ fontSize: "14px", fontWeight: 500 }}>{country}</span>
      )}
    </div>
  );
};
