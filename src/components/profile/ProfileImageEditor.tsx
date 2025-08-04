import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ProfileImageEditorProps } from "@/modules/profile/props/profileImageEditor.props";

export const ProfileImageEditor: React.FC<ProfileImageEditorProps> = ({
  profileImage,
  isEditing,
  onImageChange,
}) => {
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
        onChange={onImageChange}
        disabled={!isEditing}
      />
      <Box
        sx={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          margin: '0 auto 16px',
          cursor: isEditing ? 'pointer' : 'default',
          border: '2px solid',
          borderColor: 'primary.main',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          backgroundImage: profileImage ? `url(${profileImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          bgcolor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          '&:hover': {
            opacity: isEditing ? 0.8 : 1,
          },
        }}
      >
        {!profileImage && (
          <Typography variant="caption" color="text.secondary">
            Carregar Imagem
          </Typography>
        )}
      </Box>
      {isEditing && (
        <label htmlFor="profile-image-upload">
          <Button variant="outlined" component="span" color="primary">
            {profileImage ? 'Alterar Imagem' : 'Carregar Imagem'}
          </Button>
        </label>
      )}
    </Box>
  );
};