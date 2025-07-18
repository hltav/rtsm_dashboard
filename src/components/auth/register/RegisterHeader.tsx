import { Typography, Box } from "@mui/material";

export const RegisterHeader = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 600 }}
      >
        Crie sua conta grátis
      </Typography>
    </Box>
  );
};
