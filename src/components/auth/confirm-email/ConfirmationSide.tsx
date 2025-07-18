"use client";
import { ConfirmationSideProps } from "@/modules/auth/schemas/confirmationSideProps.schema";
import { Box, Typography, Button } from "@mui/material";

export const ConfirmationSide = ({
  onRedirectToLogin,
  status,
  countdown,
}: ConfirmationSideProps) => {
  const isVerified = status === "verified";
  const isInvalid = status === "invalid" || status === "error";

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 3, sm: 4, md: 6 },
        bgcolor: "background.paper",
      }}
    >
      {isVerified && (
        <>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            textAlign="center"
            sx={{ mb: 3, fontWeight: 600, color: "text.primary" }}
          >
            E-mail Confirmado com Sucesso!
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            Você será redirecionado em {countdown ?? 3} segundos...
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ mb: 4, color: "text.secondary" }}
          >
            Ou clique no botão abaixo para ir diretamente ao login.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ py: 1.5, mb: 2, maxWidth: "300px" }}
            onClick={onRedirectToLogin}
          >
            Ir para o Login
          </Button>
        </>
      )}

      {isInvalid && (
        <>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            textAlign="center"
            sx={{ mb: 3, fontWeight: 600, color: "text.primary" }}
          >
            Falha na Verificação
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mb: 4, color: "text.secondary" }}
          >
            O link de confirmação é inválido ou expirou. Por favor, solicite um
            novo.
          </Typography>
        </>
      )}
    </Box>
  );
};
