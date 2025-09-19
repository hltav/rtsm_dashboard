import React from "react";
import { Box, Link } from "@mui/material";

const LoginFooterLinks: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        mt: 1,
      }}
    >
      <Link
        href="/forgot-password"
        variant="body2"
        color="text.primary"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Esqueceu a senha?
      </Link>
      <Link
        href="/register"
        variant="body2"
        color="text.primary"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Não tem uma conta? Cadastre-se
      </Link>
    </Box>
  );
};

export default LoginFooterLinks;