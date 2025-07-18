/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface LoginPasswordInputProps extends Omit<TextFieldProps, "type"> {}

const LoginPasswordInput: React.FC<LoginPasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
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
  );
};

export default LoginPasswordInput;
