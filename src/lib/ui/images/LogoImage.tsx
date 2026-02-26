import React from "react";
import { Box, BoxProps } from "@mui/material";

interface LogoImageProps extends BoxProps {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  maxWidth?: string | number;
  marginBottom?: string | number;
}

const LogoImage: React.FC<LogoImageProps> = ({
  src = "/rtsm.svg",
  alt = "RT Sports Manager Logo",
  fallbackSrc = "https://placehold.co/400x250/1A2B42/E0A800?text=Logo+RT",
  maxWidth = "60%",
  marginBottom = "10px",
  sx,
  ...props
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackSrc;
  };

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={handleError}
      sx={{
        maxWidth,
        height: "auto",
        borderRadius: "8px",
        marginBottom,
        ...sx,
      }}
      {...props}
    />
  );
};

export default LogoImage;
