import React, { useState } from "react";
import Image from "next/image";

interface SafeImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | null | undefined;
  alt?: string;
  fallback?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = "",
  fallback = "/images/default.png",
  width,
  height,
  className,
}) => {
  const [error, setError] = useState(false);

  const proxiedSrc = src
    ? `${process.env.NEXT_PUBLIC_API_URL}/proxy/badges/thesportsdb/${btoa(src)}`
    : fallback;

  return (
    <Image
      src={error ? fallback : proxiedSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setError(true)}
      unoptimized
      className={className}
    />
  );
};
