import { Box, Typography } from "@mui/material";

const AuthErrorState = () => (
  <Box sx={styles.container}>
    <Typography variant="h6" color="error">
      Erro: Não foi possível carregar as informações do usuário.
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

export default AuthErrorState;