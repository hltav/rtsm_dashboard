import React, { useState, useEffect } from "react";
import Image from "next/image";
import { imageProxyApi } from "@/lib/api/image/imageProxyApi";

interface SafeImageProps {
  src: string | null | undefined;
  alt?: string;
  fallback?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = "",
  fallback = "./football_default.png",
  width = 40,
  height = 40,
  className,
  style,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(fallback);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);

    if (!src) {
      setCurrentSrc(fallback);
      return;
    }

    const proxyUrl = imageProxyApi.getFullProxyUrl(src);

    setCurrentSrc(proxyUrl);
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError) {
      console.error("SafeImage - Falha ao carregar:", {
        tentou: currentSrc,
        original: src,
      });
      setHasError(true);
      setCurrentSrc(fallback);
    }
  };

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      className={className}
      style={style}
      unoptimized
    />
  );
};
