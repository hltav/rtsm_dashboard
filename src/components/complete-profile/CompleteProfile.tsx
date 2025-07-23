'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
} from '@mui/material';
import { ThemeRegistry } from '../Providers/ThemeRegistry';
import EditableUserInfo from './EditableUserInfo';
import NonEditableUserInfo from './NonEditableUserInfo';
import PageHeader from './PageHeader';
import ProfileImageUploader from './ProfileImageUploader';

interface CompleteProfilePageProps {
  onComplete?: () => void; // será chamada após salvar
}

const CompleteProfilePage: React.FC<CompleteProfilePageProps> = ({ onComplete }) => {
  // Dados simulados do backend (não editáveis)
  const [firstName] = useState('João');
  const [lastName] = useState('Silva');
  const [username] = useState('joao.silva');
  const [email] = useState('joao.silva@example.com');

  // Dados editáveis
  const [cpf, setCpf] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [imageOffsetX, setImageOffsetX] = useState(50);
  const [imageOffsetY, setImageOffsetY] = useState(50);
  const [imageScale, setImageScale] = useState(100);

  const handleImageChange = (file: File | null) => {
    setProfileImage(file);
    setProfileImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleOffsetChange = (x: number, y: number) => {
    setImageOffsetX(x);
    setImageOffsetY(y);
  };

  const handleScaleChange = (scale: number) => {
    setImageScale(scale);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const profileData = {
      firstName,
      lastName,
      username,
      email,
      cpf,
      gender,
      phone,
      neighborhood,
      city,
      state,
      profileImage,
      imageOffsetX,
      imageOffsetY,
      imageScale,
    };

    console.log('Dados do Perfil Completos:', profileData);
    alert('Perfil atualizado com sucesso!');

    if (onComplete) {
      onComplete(); // fecha o modal se foi aberto como modal
    }
  };

  return (
    <ThemeRegistry>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          p: { xs: 2, sm: 3, md: 0 },
        }}
      >
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              overflow: 'hidden',
              width: '95%',
              maxWidth: { xs: '95%', sm: '700px' },
              margin: { xs: '20px auto', md: '20px auto' },
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 3, sm: 4, md: 6 },
                bgcolor: 'background.paper',
                overflowY: 'auto',
                maxHeight: { xs: 'calc(100vh - 40px)', sm: 'calc(100vh - 60px)', md: 'unset' },
              }}
            >
              <PageHeader />

              <NonEditableUserInfo
                firstName={firstName}
                lastName={lastName}
                username={username}
                email={email}
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

              <ProfileImageUploader
                imagePreview={profileImagePreview}
                onImageChange={handleImageChange}
                imageOffsetX={imageOffsetX}
                imageOffsetY={imageOffsetY}
                imageScale={imageScale}
                onOffsetChange={handleOffsetChange}
                onScaleChange={handleScaleChange}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
              >
                Salvar Perfil
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeRegistry>
  );
};

export default CompleteProfilePage;
