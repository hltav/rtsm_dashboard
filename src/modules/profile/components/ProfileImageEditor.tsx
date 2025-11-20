import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { ProfileImageEditorProps } from "@/modules/profile/props/profileImageEditor.props";

export const ProfileImageEditor: React.FC<ProfileImageEditorProps> = ({
  profileImage,
  isEditing,
  onImageChange,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 2, textAlign: "center" }}>
      <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
        Foto de Perfil
      </Typography>

      <input
        accept="image/*"
        style={{ display: "none" }}
        id="profile-image-upload"
        type="file"
        onChange={onImageChange}
        disabled={!isEditing}
      />

      <Box
        sx={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          margin: "0 auto 16px",
          cursor: isEditing ? "pointer" : "default",
          border: "2px solid",
          borderColor: theme.palette.primary.main,
          boxShadow: theme.shadows[4],
          backgroundImage: profileImage ? `url(${profileImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          bgcolor: theme.palette.grey[200],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          "&:hover": {
            opacity: isEditing ? 0.8 : 1,
          },
        }}
      >
        {!profileImage && (
          <Typography variant="caption" color="secondary.contrastText">
            Carregar Imagem
          </Typography>
        )}
      </Box>

      {isEditing && (
        <label htmlFor="profile-image-upload">
          <Button
            variant="outlined"
            component="span"
            sx={{
              borderColor: (theme) => theme.palette.secondary.contrastText,
              color: (theme) => theme.palette.secondary.contrastText,
            }}
          >
            {profileImage ? "Alterar Imagem" : "Carregar Imagem"}
          </Button>
        </label>
      )}
    </Box>
  );
};
