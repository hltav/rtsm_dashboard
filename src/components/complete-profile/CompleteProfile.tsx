// 'use client';
// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   CssBaseline,
//   Paper,
// } from '@mui/material';
// import { ThemeRegistry } from '../Providers/ThemeRegistry';
// import EditableUserInfo from './EditableUserInfo';
// import NonEditableUserInfo from './NonEditableUserInfo';
// import PageHeader from './PageHeader';
// import ProfileImageUploader from './ProfileImageUploader';

// interface CompleteProfilePageProps {
//   onComplete?: () => void; // será chamada após salvar
// }

// const CompleteProfilePage: React.FC<CompleteProfilePageProps> = ({ onComplete }) => {
//   // Dados simulados do backend (não editáveis)
//   const [firstName] = useState('João');
//   const [lastName] = useState('Silva');
//   const [username] = useState('joao.silva');
//   const [email] = useState('joao.silva@example.com');

//   // Dados editáveis
//   const [cpf, setCpf] = useState('');
//   const [gender, setGender] = useState('');
//   const [phone, setPhone] = useState('');
//   const [neighborhood, setNeighborhood] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
//   const [imageOffsetX, setImageOffsetX] = useState(50);
//   const [imageOffsetY, setImageOffsetY] = useState(50);
//   const [imageScale, setImageScale] = useState(100);

//   const handleImageChange = (file: File | null) => {
//     setProfileImage(file);
//     setProfileImagePreview(file ? URL.createObjectURL(file) : null);
//   };

//   const handleOffsetChange = (x: number, y: number) => {
//     setImageOffsetX(x);
//     setImageOffsetY(y);
//   };

//   const handleScaleChange = (scale: number) => {
//     setImageScale(scale);
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();

//     const profileData = {
//       firstName,
//       lastName,
//       username,
//       email,
//       cpf,
//       gender,
//       phone,
//       neighborhood,
//       city,
//       state,
//       profileImage,
//       imageOffsetX,
//       imageOffsetY,
//       imageScale,
//     };

//     console.log('Dados do Perfil Completos:', profileData);
//     alert('Perfil atualizado com sucesso!');

//     if (onComplete) {
//       onComplete(); // fecha o modal se foi aberto como modal
//     }
//   };

//   return (
//     <ThemeRegistry>
//       <CssBaseline />
//       <Box
//         sx={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           bgcolor: 'background.default',
//           p: { xs: 2, sm: 3, md: 0 },
//         }}
//       >
//         <Container
//           disableGutters
//           maxWidth={false}
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100%',
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 3,
//               overflow: 'hidden',
//               width: '95%',
//               maxWidth: { xs: '95%', sm: '700px' },
//               margin: { xs: '20px auto', md: '20px auto' },
//             }}
//           >
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               sx={{
//                 flex: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 p: { xs: 3, sm: 4, md: 6 },
//                 bgcolor: 'background.paper',
//                 overflowY: 'auto',
//                 maxHeight: { xs: 'calc(100vh - 40px)', sm: 'calc(100vh - 60px)', md: 'unset' },
//               }}
//             >
//               <PageHeader />

//               <NonEditableUserInfo
//                 firstName={firstName}
//                 lastName={lastName}
//                 username={username}
//                 email={email}
//               />

//               <EditableUserInfo
//                 cpf={cpf}
//                 gender={gender}
//                 phone={phone}
//                 neighborhood={neighborhood}
//                 city={city}
//                 state={state}
//                 onCpfChange={setCpf}
//                 onGenderChange={setGender}
//                 onPhoneChange={setPhone}
//                 onNeighborhoodChange={setNeighborhood}
//                 onCityChange={setCity}
//                 onStateChange={setState}
//               />

//               <ProfileImageUploader
//                 imagePreview={profileImagePreview}
//                 onImageChange={handleImageChange}
//                 imageOffsetX={imageOffsetX}
//                 imageOffsetY={imageOffsetY}
//                 imageScale={imageScale}
//                 onOffsetChange={handleOffsetChange}
//                 onScaleChange={handleScaleChange}
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 size="large"
//                 sx={{ py: 1.5 }}
//               >
//                 Salvar Perfil
//               </Button>
//             </Box>
//           </Paper>
//         </Container>
//       </Box>
//     </ThemeRegistry>
//   );
// };

// export default CompleteProfilePage;

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
  CircularProgress, // Adicionado CircularProgress para loading da página
} from "@mui/material";
import { ThemeRegistry } from "../Providers/ThemeRegistry";
import EditableUserInfo from "./EditableUserInfo";
import NonEditableUserInfo from "./NonEditableUserInfo";
import PageHeader from "./PageHeader";
import ProfileImageUploader from "./ProfileImageUploader";
import axios from "axios";
import { useAuth } from "../Providers/AuthContext";

interface CompleteProfilePageProps {
  onComplete?: () => void;
}

const CompleteProfilePage: React.FC<CompleteProfilePageProps> = ({
  onComplete,
}) => {
  const { user, token, updateUser } = useAuth();

  const userId = user?.id;
  const authToken = token;

  const [cpf, setCpf] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Estados para a imagem de perfil
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [imageOffsetX, setImageOffsetX] = useState(50);
  const [imageOffsetY, setImageOffsetY] = useState(50);
  const [imageScale, setImageScale] = useState(100);

  // Estados para feedback do upload da imagem
  const [imageUploadMessage, setImageUploadMessage] = useState<string | null>(
    null
  );
  const [isImageUploadError, setIsImageUploadError] = useState(false);

  // Estado para feedback do salvamento de outros dados do perfil
  const [profileSaveMessage, setProfileSaveMessage] = useState<string | null>(
    null
  );
  const [isProfileSaveError, setIsProfileSaveError] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false); // Loading para salvar dados do perfil

  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true); // Loading para buscar dados iniciais

  // 1. Carregar dados do perfil e imagem existente ao montar o componente
  useEffect(() => {
    const fetchUserProfileData = async () => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

      // Verificação essencial da URL base e do token
      if (!apiBaseUrl || !authToken || !userId) {
        console.warn(
          "Dados básicos insuficientes (URL, token ou userId). Abortando busca de perfil."
        );
        setIsLoadingInitialData(false);
        return;
      }

      // **NOVA LÓGICA:** Verificar se clientData existe ANTES de tentar buscar
      // user.clientData já deve estar disponível no objeto 'user'
      // se o usuário já tiver completado o perfil anteriormente.
      const currentClientDataId = user?.clientData?.id;

      if (!currentClientDataId) {
        // Se não há clientDataId, significa que o clientData ainda não foi criado.
        // O modal de completar perfil deve ser exibido.
        console.log(
          "ClientData não encontrado. Usuário precisa completar o perfil."
        );
        setIsLoadingInitialData(false);
        return; // Não faz a requisição, pois não há clientData para buscar
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
        // Preencher estados com os dados da API
        setCpf(data.cpf || "");
        setGender(data.gender || "");
        setPhone(data.phone || "");
        setNeighborhood(data.neighborhood || "");
        setCity(data.city || "");
        setState(data.state || "");

        if (data.image) {
          setProfileImagePreview(data.image);
        } else {
          setProfileImagePreview(
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          );
        }
        setImageOffsetX(data.imageOffsetX || 50);
        setImageOffsetY(data.imageOffsetY || 50);
        setImageScale(data.imageScale || 100);
      } catch (error) {
        console.error("Erro ao carregar dados do perfil inicial:", error);
        // Em caso de erro, trate-o, mas não necessariamente é um problema
        // se o backend retornar 404 quando o clientData não existe.
        // O importante é que a URL não contenha 'undefined'.
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    fetchUserProfileData();
  }, [userId, authToken, user]); // Dependências: userId e authToken

  // Funções de manipuladores para ProfileImageUploader
  const handleImageChange = (file: File | null) => {
    if (file) {
      setProfileImagePreview(URL.createObjectURL(file));
      setImageUploadMessage(null);
      setIsImageUploadError(false);
    } else {
      setProfileImagePreview(null);
    }
  };

  const handleOffsetChange = (x: number, y: number) => {
    setImageOffsetX(x);
    setImageOffsetY(y);
  };

  const handleScaleChange = (scale: number) => {
    setImageScale(scale);
  };

  // Callbacks para o ProfileImageUploader
  const handleProfileImageUploadSuccess = (imageUrl: string) => {
    setProfileImagePreview(imageUrl);
    setImageUploadMessage("Foto de perfil atualizada com sucesso!");
    setIsImageUploadError(false);
    // **IMPORTANTE**: Atualizar o estado global do usuário no useAuth
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

  // Função para salvar os outros dados do perfil
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
      cpf,
      gender,
      phone,
      neighborhood,
      city,
      state,
      imageOffsetX,
      imageOffsetY,
      imageScale,
    };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/client-data/${userId}`, // Ajuste para sua rota real de atualização de dados do cliente
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

  // Estado de carregamento inicial da página
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

  // Se user ou token não estão disponíveis após o carregamento inicial (ex: usuário não logado)
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
                cpf={cpf}
                gender={gender}
                phone={phone}
                neighborhood={neighborhood}
                city={city}
                state={state}
                onCpfChange={setCpf}
                onGenderChange={setGender}
                onPhoneChange={setPhone}
                onNeighborhoodChange={setNeighborhood}
                onCityChange={setCity}
                onStateChange={setState}
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
                imageOffsetX={imageOffsetX}
                imageOffsetY={imageOffsetY}
                imageScale={imageScale}
                onOffsetChange={handleOffsetChange}
                onScaleChange={handleScaleChange}
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
