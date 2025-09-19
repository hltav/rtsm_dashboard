/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { ProfileImageUploaderProps } from "@/modules/complete-profile/interface/profileImageUploaderProps";
import { uploadRtsmImage } from "@/lib/api/uploadImage";

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  imagePreview,
  onImageChange,
  onUploadSuccess,
  onUploadError,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isImageUploadError, setIsImageUploadError] = useState(false);

  const handleImageChangeWithUploadPreparation = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    onImageChange(file);

    if (!file) return;

    try {
      setIsUploading(true);
      const urls = await uploadRtsmImage(event);
      if (urls.length > 0) {
        onUploadSuccess(urls[0]);
      } else {
        throw new Error("Nenhuma imagem foi enviada.");
      }
    } catch (error) {
      console.error("Erro ao enviar imagem para o Google Drive:", error);
      onUploadError("Erro ao enviar imagem.");
      setIsImageUploadError(true);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
        Foto de Perfil
      </Typography>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="profile-image-upload"
        type="file"
        onChange={handleImageChangeWithUploadPreparation}
      />
      <Box
        sx={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          margin: "0 auto 16px",
          border: "2px solid primary.main",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          backgroundImage: `url(${
            imagePreview ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          bgcolor: "grey.200",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {isUploading && (
          <CircularProgress size={60} sx={{ color: "primary.main" }} />
        )}
      </Box>
      <label htmlFor="profile-image-upload">
        <Button
          variant="outlined"
          component="span"
          color="primary"
          disabled={isUploading}
          sx={(theme) => ({
            ...(theme.palette.mode === "dark" && {
              border: "1px solid #fff",
              color: "#fff",
              "&:hover": {
                border: "1px solid #fff",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }),
          })}
        >
          {isUploading ? "Enviando..." : "Carregar Imagem"}
        </Button>
      </label>
    </Box>
  );
};

export default ProfileImageUploader;
