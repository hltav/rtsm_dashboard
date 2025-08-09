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
  Stack,
} from "@mui/material";
import { ProfileImageEditor } from "./components/ProfileImageEditor";
import { UserFormFields } from "./components/UserFormFields";
import { useAuth } from "../../components/Providers/AuthContext";

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

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <>
      <CssBaseline />
      <Box
        color="primary"
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          p: { xs: 2, sm: 3, md: 0 },
          mt: "10%",
          ml: { xs: 0, md: "10%" },
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
            border: "none",
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
              border: "none",
              bgcolor: "#1A2B42",
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
                p: { xs: 1, sm: 4, md: 6 },
                bgcolor: "#1A2B42",
                border: "none",
                maxHeight: {
                  xs: "unset",
                  sm: "unset",
                  md: "unset",
                },
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                textAlign="center"
                sx={{ fontWeight: 700, color: "#fff", mb: 1 }}
              >
                Meu Perfil
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ opacity: 0.9, mb: 2, color: "text.tertiary" }}
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

              {isEditing ? (
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
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
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ py: 1.5, flex: 1 }}
                  >
                    Salvar 
                  </Button>
                </Stack>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  size="large"
                  sx={{ py: 1.5 }}
                  onClick={() => setIsEditing(true)}
                >
                  Editar Perfil
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ProfileContentPage;
