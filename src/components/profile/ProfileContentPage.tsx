"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  CssBaseline,
  SelectChangeEvent,
} from "@mui/material";
import { ProfileImageEditor } from "./ProfileImageEditor";
import { UserFormFields } from "./UserFormFields";
import { useAuth } from "../Providers/AuthContext";

const ProfileContentPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    image: user?.clientData?.image || "",
    city: user?.clientData?.address?.city || "",
    state: user?.clientData?.address?.state || "",
    neighborhood: user?.clientData?.address?.neighborhood || "",
  });

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleEditSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditing && updateUser && user) {
      updateUser({
        ...user,
        clientData: {
          ...user.clientData,
          image: formData.image,
          address: {
            ...user.clientData?.address,
            city: formData.city,
            state: formData.state,
            neighborhood: formData.neighborhood,
          },
        },
      });
      alert("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: { xs: 2, sm: 3, md: 0 },
        }}
      >
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              overflow: "hidden",
              width: "95%",
              maxWidth: { xs: "95%", sm: "700px" },
              margin: "20px auto",
            }}
          >
            <Box
              component="form"
              onSubmit={handleEditSave}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 3, sm: 4, md: 6 },
                bgcolor: "background.paper",
                overflowY: "auto",
                maxHeight: {
                  xs: "calc(100vh - 40px)",
                  sm: "calc(100vh - 60px)",
                  md: "unset",
                },
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                textAlign="center"
                sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
              >
                Meu Perfil
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ opacity: 0.9, mb: 4, color: "text.secondary" }}
              >
                Visualize e edite suas informações pessoais.
              </Typography>

              <ProfileImageEditor
                profileImage={formData.image}
                isEditing={isEditing}
                onImageChange={handleImageChange}
              />

              <UserFormFields
                isEditing={isEditing}
                onTextFieldChange={handleTextFieldChange}
                onSelectChange={handleSelectChange}
                city={formData.city}
                state={formData.state}
                neighborhood={formData.neighborhood}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
              >
                {isEditing ? "Salvar Alterações" : "Editar Perfil"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ProfileContentPage
