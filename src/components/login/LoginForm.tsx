import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginFormProps {
  onLogin: (username: string, rememberMe: boolean) => void;
  initialUsername?: string;
  initialRememberMe?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  initialUsername = '',
  initialRememberMe = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(initialRememberMe);
  const [username, setUsername] = useState(initialUsername);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  
  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, rememberMe);
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
        p: { xs: 2, sm: 4, md: 6 },
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom textAlign="center" sx={{ mb: 4, fontWeight: 600 }}>
        Acesse sua conta
      </Typography>

      <TextField
        label="Email ou Nome de Usuário"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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

      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
            color="primary"
            size="small"
          />
        }
        label="Lembrar-me"
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ py: 1.5, mb: 2 }}
      >
        Entrar
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mt: 1 }}>
        <Link href="/forgot-password" variant="body2" color="primary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Esqueceu a senha?
        </Link>
        <Link href="/register" variant="body2" color="primary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Não tem uma conta? Cadastre-se
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;