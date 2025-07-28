import React from "react";
import { Typography } from "@mui/material";

interface LoginFormErrorProps {
  message: string | null;
}

const LoginFormError: React.FC<LoginFormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
      {message}
    </Typography>
  );
};

export default LoginFormError;