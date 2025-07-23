// components/ProfileImageUploader.tsx
'use client';

import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface ProfileImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  imageOffsetX: number;
  imageOffsetY: number;
  imageScale: number;
  onOffsetChange: (x: number, y: number) => void;
  onScaleChange: (scale: number) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  imagePreview,
  onImageChange,
  imageOffsetX,
  imageOffsetY,
  imageScale,
  onOffsetChange,
  onScaleChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDragX, setStartDragX] = useState(0);
  const [startDragY, setStartDragY] = useState(0);
  const [initialOffsetX, setInitialOffsetX] = useState(50);
  const [initialOffsetY, setInitialOffsetY] = useState(50);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onImageChange(file);
    onOffsetChange(50, 50);
    onScaleChange(100);
  };

  const handleZoomIn = () => onScaleChange(Math.min(imageScale + 10, 200));
  const handleZoomOut = () => onScaleChange(Math.max(imageScale - 10, 100));

  // Funções de arrastar (Mouse Events)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imagePreview) return;
    setIsDragging(true);
    setStartDragX(e.clientX);
    setStartDragY(e.clientY);
    setInitialOffsetX(imageOffsetX);
    setInitialOffsetY(imageOffsetY);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imagePreview || !imageContainerRef.current) return;

    const deltaX = e.clientX - startDragX;
    const deltaY = e.clientY - startDragY;

    const containerSize = imageContainerRef.current.offsetWidth;
    const percentagePerPixel = 100 / containerSize;

    const newOffsetX = initialOffsetX + deltaX * percentagePerPixel;
    const newOffsetY = initialOffsetY + deltaY * percentagePerPixel;

    onOffsetChange(newOffsetX, newOffsetY);
  };

  const handleMouseUp = () => setIsDragging(false);

  // Funções de arrastar (Touch Events)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!imagePreview) return;
    setIsDragging(true);
    setStartDragX(e.touches[0].clientX);
    setStartDragY(e.touches[0].clientY);
    setInitialOffsetX(imageOffsetX);
    setInitialOffsetY(imageOffsetY);
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !imagePreview || !imageContainerRef.current) return;

    const deltaX = e.touches[0].clientX - startDragX;
    const deltaY = e.touches[0].clientY - startDragY;

    const containerSize = imageContainerRef.current.offsetWidth;
    const percentagePerPixel = 100 / containerSize;

    const newOffsetX = initialOffsetX + deltaX * percentagePerPixel;
    const newOffsetY = initialOffsetY + deltaY * percentagePerPixel;

    onOffsetChange(newOffsetX, newOffsetY);
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
        Foto de Perfil
      </Typography>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="profile-image-upload"
        type="file"
        onChange={handleImageChange}
      />
      <Box
        ref={imageContainerRef}
        sx={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          margin: '0 auto 16px',
          cursor: imagePreview ? 'grab' : 'default',
          border: '2px solid primary.main',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          backgroundImage: `url(${imagePreview || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"})`,
          backgroundSize: `${imageScale}%`,
          backgroundPosition: `${imageOffsetX}% ${imageOffsetY}%`,
          backgroundRepeat: 'no-repeat',
          bgcolor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          '&:hover': {
            opacity: 0.8,
          },
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDragStart={(e) => e.preventDefault()}
      />
      <label htmlFor="profile-image-upload">
        <Button variant="outlined" component="span" color="primary" sx={{ mr: 1 }}>
          Carregar Imagem
        </Button>
      </label>
      {imagePreview && (
        <>
          <Button variant="outlined" color="secondary" onClick={handleZoomIn} sx={{ mr: 1 }}>
            + Zoom
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleZoomOut}>
            - Zoom
          </Button>
        </>
      )}
    </Box>
  );
};

export default ProfileImageUploader;