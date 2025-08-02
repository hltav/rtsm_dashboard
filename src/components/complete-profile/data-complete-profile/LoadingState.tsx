import { Box, Typography, CircularProgress } from "@mui/material";

const LoadingState = () => (
  <Box sx={styles.container}>
    <CircularProgress />
    <Typography variant="h6" sx={{ ml: 2 }}>
      Carregando informações do perfil...
    </Typography>
  </Box>
);

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  }
};

export default LoadingState;