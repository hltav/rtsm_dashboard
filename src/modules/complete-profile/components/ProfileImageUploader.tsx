"use client";
import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { ProfileImageUploaderProps } from "@/modules/complete-profile/interface/profileImageUploaderProps";
import { useUserAvatar } from "@/hooks/useUserAvatar";

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  userId,
  onUploadSuccess,
  onUploadError,
}) => {
  const { avatarUrl, uploadAvatar, isLoading } = useUserAvatar(userId);
  const [hasError, setHasError] = useState(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { url } = await uploadAvatar(file);
      onUploadSuccess?.(url);
      setHasError(false);
    } catch (error) {
      console.error("Erro ao enviar avatar:", error);
      onUploadError?.("Erro ao enviar imagem.");
      setHasError(true);
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
        onChange={handleImageChange}
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
            avatarUrl ||
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
        {isLoading && (
          <CircularProgress size={60} sx={{ color: "primary.main" }} />
        )}
      </Box>

      <label htmlFor="profile-image-upload">
        <Button
          variant="outlined"
          component="span"
          disabled={isLoading}
          sx={{
            flex: 1,
            borderColor: "secondary.main",
            color: "secondary.main",
            "&:hover": {
              borderColor: "gold",
              backgroundColor: "rgba(255, 255, 0, 0.02)",
            },
          }}
        >
          {isLoading ? "Enviando..." : "Carregar Imagem"}
        </Button>
      </label>

      {hasError && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          Falha ao enviar imagem. Tente novamente.
        </Typography>
      )}
    </Box>
  );
};

export default ProfileImageUploader;
