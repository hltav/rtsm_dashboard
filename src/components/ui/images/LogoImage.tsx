import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface LogoImageProps extends BoxProps {
  /**
   * Caminho para a imagem do logo
   * @default "/
/RTSMlogo.svg"
   */
  src?: string;
  /**
   * Texto alternativo para a imagem
   * @default "<span translate="no">RT Sports Manager</span>
 Logo"
   */
  alt?: string;
  /**
   * URL de fallback caso a imagem não carregue
   * @default "https://placehold.co/400x250/1A2B42/E0A800?text=Logo+RT"
   */
  fallbackSrc?: string;
  /**
   * Largura máxima do logo
   * @default "80%"
   */
  maxWidth?: string | number;
  /**
   * Espaçamento inferior
   * @default "20px"
   */
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
        height: 'auto',
        borderRadius: '8px',
        marginBottom,
               ...sx, // Permite sobrescrever estilos via props
      }}
      {...props}
    />
  );
};

export default LogoImage;