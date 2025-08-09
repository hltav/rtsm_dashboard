import { Box, Typography, CircularProgress } from "@mui/material";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";

export const LoadingState = () => (
  <ThemeRegistry>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6">Verificando seu e-mail...</Typography>
    </Box>
  </ThemeRegistry>
);