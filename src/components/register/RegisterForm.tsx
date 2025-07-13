import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface RegisterFormProps {
  onRegister: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
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
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{ mb: 4, fontWeight: 600 }}
      >
        Crie sua conta grátis
      </Typography>

      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        sx={{ mb: 1 }}
      />
      <TextField
        label="Sobrenome"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        sx={{ mb: 1 }}
      />
      <TextField
        label="Nome de Usuário"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        sx={{ mb: 1 }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        size="small"
        sx={{ mb: 1 }}
      />
      <TextField
        label="Senha"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        size="small"
        sx={{ mb: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirme a Senha"
        variant="outlined"
        type={showConfirmPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        size="small"
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowConfirmPassword}
                edge="end"
                size="small"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ py: 1.5, mb: 2 }}
      >
        Cadastrar
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Já tem uma conta?{' '}
          <Link href="/login" variant="body2" color="primary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Faça Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;