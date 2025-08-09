import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingAndErrorStatesProps {
  isLoading: boolean;
  error: string | null;
}

const LoadingAndErrorStates: React.FC<LoadingAndErrorStatesProps> = ({
  isLoading,
  error,
}) => {
  if (isLoading) {
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

  if (error) {
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
          {error}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default LoadingAndErrorStates;