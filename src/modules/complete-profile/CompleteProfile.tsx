"use client";
import React, { useState, useEffect, useCallback } from "react";
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
import { useAuth } from "../../components/Providers/AuthContext";
import { clientDataService } from "@/lib/api/clientData/clientDataApi";
import { ClientData } from "../client-data/client-data.schema";
import { CreateClientDataDTO } from "../client-data/createClientData.schema";
import { Address } from "../client-data/address.schema";

interface CompleteProfilePageProps {
  onComplete?: () => void;
}

const normalizeClientData = (data: ClientData): CreateClientDataDTO => ({
  ...data,
  address: data.address
    ? {
        neighborhood: data.address.neighborhood ?? undefined,
        city: data.address.city ?? undefined,
        state: data.address.state ?? undefined,
      }
    : undefined,
});

const CompleteProfilePage: React.FC<CompleteProfilePageProps> = ({
  onComplete,
}) => {
  const { user, updateUser } = useAuth();

  const [clientData, setClientData] = useState<ClientData>({});
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

  // Fetch inicial dos dados do usuário
  useEffect(() => {
    const fetchUserProfileData = async () => {
      if (!userId) return setIsLoadingInitialData(false);

      const currentClientDataId = user?.clientData?.id;
      if (!currentClientDataId) return setIsLoadingInitialData(false);

      setIsLoadingInitialData(true);

      try {
        const { data } = await clientDataService.get(
          userId,
          currentClientDataId
        );

        setClientData({
          ...data,
          address: {
            neighborhood: data.address?.neighborhood ?? undefined,
            city: data.address?.city ?? undefined,
            state: data.address?.state ?? undefined,
          },
        });

        if (data.image) setProfileImagePreview(data.image);
      } catch (err) {
        console.error("Erro ao carregar dados do perfil inicial:", err);
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    fetchUserProfileData();
  }, [userId, user]);

  // Handle mudança de campo simples
  const handleFieldChange = useCallback(
    <K extends keyof Omit<ClientData, "address">>(
      field: K,
      value: ClientData[K]
    ) => {
      setClientData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Handle mudança de campo de endereço
  const handleAddressFieldChange = useCallback(
    <K extends keyof Address>(field: K, value: string | undefined) => {
      setClientData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    },
    []
  );

  const handleProfileImageUploadSuccess = useCallback(
    (imageUrl: string) => {
      setProfileImagePreview(imageUrl);
      setImageUploadMessage("Foto de perfil atualizada com sucesso!");
      setIsImageUploadError(false);

      setClientData((prev) => ({ ...prev, image: imageUrl }));

      if (updateUser && user) {
        updateUser({
          ...user,
          clientData: { ...user.clientData, image: imageUrl },
        });
      }
    },
    [updateUser, user]
  );

  const handleProfileImageUploadError = useCallback((error: string) => {
    setImageUploadMessage(`Erro ao carregar foto de perfil: ${error}`);
    setIsImageUploadError(true);
  }, []);

  // Submit do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) return setProfileSaveMessage("Erro: ID do usuário ausente.");

    setIsSavingProfile(true);
    setProfileSaveMessage(null);
    setIsProfileSaveError(false);

    const dataToSend: CreateClientDataDTO = normalizeClientData({
      ...clientData,
      userId,
      image: clientData.image,
    });

    try {
      const { data } = await clientDataService.create(dataToSend);

      setProfileSaveMessage("Perfil atualizado com sucesso!");
      setIsProfileSaveError(false);

      if (updateUser && user) {
        updateUser({
          ...user,
          clientData: { ...user.clientData, ...data },
        });
      }

      onComplete?.();
    } catch (err: unknown) {
      console.error("Erro ao salvar perfil:", err);
      setProfileSaveMessage(
        err instanceof Error ? err.message : "Erro inesperado ao salvar perfil."
      );
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

  if (!userId) {
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

              <NonEditableUserInfo
                firstName={user.firstname}
                lastName={user.lastname}
                username={user.nickname}
                email={user.email}
              />

              <EditableUserInfo
                cpf={clientData.cpf ?? ""}
                gender={clientData.gender ?? ""}
                phone={clientData.phone ?? ""}
                neighborhood={clientData.address?.neighborhood ?? ""}
                city={clientData.address?.city ?? ""}
                state={clientData.address?.state ?? ""}
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
                onImageChange={(file) =>
                  file && handleFieldChange("image", URL.createObjectURL(file))
                }
                userId={userId}
                onUploadSuccess={handleProfileImageUploadSuccess}
                onUploadError={handleProfileImageUploadError}
              />

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
