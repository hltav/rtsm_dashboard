"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ThemeRegistry } from "../../components/Providers/ThemeRegistry";
import EditableUserInfo from "./components/EditableUserInfo";
import NonEditableUserInfo from "./components/NonEditableUserInfo";
import PageHeader from "./components/PageHeader";
import ProfileImageUploader from "./components/ProfileImageUploader";
import axios from "axios";
import { useAuth } from "../../components/Providers/AuthContext";

interface CompleteProfilePageProps {
  onComplete?: () => void;
}

const CompleteProfilePage: React.FC<CompleteProfilePageProps> = ({
  onComplete,
}) => {
  const { user, token, updateUser } = useAuth();
  const [clientData, setClientData] = useState<{
    gender?: string;
    cpf?: string;
    image?: string;
    phone?: string;
    userId?: number;
    address?: {
      neighborhood?: string | null;
      city?: string | null;
      state?: string | null;
    } | null;
  }>({});

  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [imageUploadMessage, setImageUploadMessage] = useState<string | null>(
    null
  );
  const [isImageUploadError, setIsImageUploadError] = useState(false);
  const [profileSaveMessage, setProfileSaveMessage] = useState<string | null>(
    null
  );
  const [isProfileSaveError, setIsProfileSaveError] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);

  const userId = user?.id;
  const authToken = token;

  useEffect(() => {
    const fetchUserProfileData = async () => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiBaseUrl || !authToken || !userId) {
        console.warn(
          "Dados básicos insuficientes (URL, token ou userId). Abortando busca de perfil."
        );
        setIsLoadingInitialData(false);
        return;
      }

      const currentClientDataId = user?.clientData?.id;

      if (!currentClientDataId) {
        console.log(
          "ClientData não encontrado. Usuário precisa completar o perfil."
        );
        setIsLoadingInitialData(false);
        return;
      }

      setIsLoadingInitialData(true);
      try {
        const response = await axios.get(
          `${apiBaseUrl}/users/${userId}/client-data/${currentClientDataId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = response.data;
        setClientData({
          gender: data.gender,
          cpf: data.cpf,
          phone: data.phone,
          userId: data.userId,
          address: {
            neighborhood: data.address?.neighborhood,
            city: data.address?.city,
            state: data.address?.state,
          },
          image: data.image || undefined,
        });

        if (data.image) {
          setProfileImagePreview(data.image);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do perfil inicial:", error);
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    fetchUserProfileData();
  }, [userId, authToken, user]);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setProfileImagePreview(URL.createObjectURL(file));
      setImageUploadMessage(null);
      setIsImageUploadError(false);
    }
  };

  const handleProfileImageUploadSuccess = (imageUrl: string) => {
    setProfileImagePreview(imageUrl);
    setImageUploadMessage("Foto de perfil atualizada com sucesso!");
    setIsImageUploadError(false);

    setClientData((prev) => ({
      ...prev,
      image: imageUrl,
    }));

    if (updateUser && user) {
      updateUser({
        ...user,
        clientData: {
          ...user.clientData,
          image: imageUrl,
        },
      });
    }
  };

  const handleProfileImageUploadError = (error: string) => {
    setImageUploadMessage(`Erro ao carregar foto de perfil: ${error}`);
    setIsImageUploadError(true);
  };

  const handleFieldChange = <
    K extends keyof Omit<typeof clientData, "address">
  >(
    field: K,
    value: (typeof clientData)[K]
  ) => {
    setClientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressFieldChange = (
    field: keyof NonNullable<typeof clientData.address>,
    value: string | null
  ) => {
    setClientData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId || !authToken) {
      setProfileSaveMessage(
        "Erro: ID do usuário ou token de autenticação ausentes."
      );
      setIsProfileSaveError(true);
      return;
    }

    setIsSavingProfile(true);
    setProfileSaveMessage(null);
    setIsProfileSaveError(false);

    const profileDataToSave = {
      ...clientData,
      userId,
      image: clientData.image,
    };

    console.log("Dados a serem enviados:", profileDataToSave);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/client-data`,
        profileDataToSave,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Resposta da API (salvar perfil):", response.data);
      setProfileSaveMessage("Perfil atualizado com sucesso!");
      setIsProfileSaveError(false);

      // Atualiza o usuário no context/local
      if (updateUser && user) {
        updateUser({
          ...user,
          clientData: {
            ...(user.clientData || {}),
            ...clientData,
            image: clientData.image,
          },
        });
      }

      if (onComplete) {
        onComplete();
      }
    } catch (error: unknown) {
      console.error("Erro ao salvar perfil:", error);
      if (axios.isAxiosError(error)) {
        setProfileSaveMessage(
          error.response?.data?.message ||
            error.message ||
            "Erro desconhecido ao salvar perfil."
        );
      } else if (error instanceof Error) {
        setProfileSaveMessage(
          error.message || "Erro desconhecido ao salvar perfil."
        );
      } else {
        const errorMessage = (error as { message?: string })?.message;
        setProfileSaveMessage(
          errorMessage || String(error) || "Erro inesperado ao salvar perfil."
        );
      }
      setIsProfileSaveError(true);
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (isLoadingInitialData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" color="text.secondary" sx={{ ml: 2 }}>
          Carregando informações do perfil...
        </Typography>
      </Box>
    );
  }

  if (!userId || !authToken) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Erro: Não foi possível carregar as informações do usuário. Por favor,
          faça login novamente.
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeRegistry>
      <CssBaseline />
      <Box
        sx={{
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
              margin: { xs: "20px auto", md: "20px auto" },
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
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
              <PageHeader />

              {/* Dados não editáveis vindo do 'user' do useAuth */}
              <NonEditableUserInfo
                firstName={user.firstname}
                lastName={user.lastname}
                username={user.nickname}
                email={user.email}
              />

              <EditableUserInfo
                cpf={clientData.cpf || ""}
                gender={clientData.gender || ""}
                phone={clientData.phone || ""}
                neighborhood={clientData.address?.neighborhood || ""}
                city={clientData.address?.city || ""}
                state={clientData.address?.state || ""}
                onCpfChange={(value) => handleFieldChange("cpf", value)}
                onGenderChange={(value) => handleFieldChange("gender", value)}
                onPhoneChange={(value) => handleFieldChange("phone", value)}
                onNeighborhoodChange={(value) =>
                  handleAddressFieldChange("neighborhood", value)
                }
                onCityChange={(value) =>
                  handleAddressFieldChange("city", value)
                }
                onStateChange={(value) =>
                  handleAddressFieldChange("state", value)
                }
              />

              {/* Mensagem de feedback do upload da imagem */}
              {imageUploadMessage && (
                <Alert
                  severity={isImageUploadError ? "error" : "success"}
                  sx={{ mb: 2 }}
                >
                  {imageUploadMessage}
                </Alert>
              )}

              <ProfileImageUploader
                imagePreview={profileImagePreview}
                onImageChange={handleImageChange}
                userId={userId}
                authToken={authToken}
                onUploadSuccess={handleProfileImageUploadSuccess}
                onUploadError={handleProfileImageUploadError}
              />

              {/* Mensagem de feedback do salvamento dos outros dados */}
              {profileSaveMessage && (
                <Alert
                  severity={isProfileSaveError ? "error" : "success"}
                  sx={{ mb: 2 }}
                >
                  {profileSaveMessage}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
                disabled={isSavingProfile}
              >
                {isSavingProfile ? "Salvando..." : "Salvar Perfil"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeRegistry>
  );
};

export default CompleteProfilePage;
