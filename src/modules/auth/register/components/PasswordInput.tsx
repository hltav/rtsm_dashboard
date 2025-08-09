import React from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface PasswordInputProps extends Omit<TextFieldProps, 'type'> {
  showPassword: boolean;
  onToggleVisibility: () => void;
  label: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  showPassword,
  onToggleVisibility,
  label,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      margin="normal"
      size="small"
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? `Ocultar ${label}` : `Mostrar ${label}`}
              onClick={onToggleVisibility}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};