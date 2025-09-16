// "use client";
// import { ConfirmationSideProps } from "@/modules/auth/schemas/confirmationSideProps.schema";
// import { Box, Typography, Button, CircularProgress } from "@mui/material"; // Importe CircularProgress
// import { useState, useEffect } from "react";

// export const ConfirmationSide = ({
//   onRedirectToLogin,
//   status,
//   countdown: initialCountdown,
// }: ConfirmationSideProps) => {
//   const isVerified = status === "verified";
//   const isInvalid = status === "invalid" || status === "error";

//   const [countdown, setCountdown] = useState(initialCountdown ?? 3);
//   const totalCountdownDuration = initialCountdown ?? 3;

//   useEffect(() => {
//     let timer: number | NodeJS.Timeout;

//     if (isVerified && countdown > 0) {
//       timer = setTimeout(() => {
//         setCountdown((prevCount) => prevCount - 1);
//       }, 1000);
//     } else if (isVerified && countdown === 0) {
//       onRedirectToLogin();
//     }

//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//     };
//   }, [countdown, isVerified, onRedirectToLogin]);

//   const progressValue =
//     countdown === 0
//       ? 100
//       : ((totalCountdownDuration - countdown) / totalCountdownDuration) * 100;

//   return (
//     <Box
//       sx={{
//         flex: 1,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         p: { xs: 3, sm: 4, md: 6 },
//         bgcolor: "background.paper",
//       }}
//     >
//       {isVerified && (
//         <>
//           <Typography
//             variant="h5"
//             component="h1"
//             gutterBottom
//             textAlign="center"
//             sx={{ mb: 3, fontWeight: 600, color: "text.primary" }}
//           >
//             E-mail Confirmado com Sucesso!
//           </Typography>

//           <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
//             <CircularProgress
//               variant="determinate"
//               value={progressValue}
//               size={60}
//               thickness={5}
//             />
//             <Box
//               sx={{
//                 top: 0,
//                 left: 0,
//                 bottom: 0,
//                 right: 0,
//                 position: "absolute",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Typography
//                 variant="caption"
//                 component="div"
//                 color="text.secondary"
//                 sx={{
//                   fontSize: "1.2em",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {countdown}
//               </Typography>
//             </Box>
//           </Box>

//           <Typography
//             variant="body1"
//             textAlign="center"
//             sx={{ mb: 2, color: "text.secondary" }}
//           >
//             Você será redirecionado em segundos...
//           </Typography>
//           <Typography
//             variant="body2"
//             textAlign="center"
//             sx={{ mb: 4, color: "text.secondary" }}
//           >
//             Ou clique no botão abaixo para ir diretamente ao login.
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             size="large"
//             sx={{ py: 1.5, mb: 2, maxWidth: "300px" }}
//             onClick={onRedirectToLogin}
//           >
//             Ir para o Login
//           </Button>
//         </>
//       )}

//       {isInvalid && (
//         <>
//           <Typography
//             variant="h5"
//             component="h1"
//             gutterBottom
//             textAlign="center"
//             sx={{ mb: 3, fontWeight: 600, color: "text.primary" }}
//           >
//             Falha na Verificação
//           </Typography>
//           <Typography
//             variant="body1"
//             textAlign="center"
//             sx={{ mb: 4, color: "text.secondary" }}
//           >
//             O link de confirmação é inválido ou expirou. Por favor, solicite um
//             novo.
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             size="large"
//             sx={{ py: 1.5, mb: 2, maxWidth: "300px" }}
//           >
//             Novo Link
//           </Button>
//           <Typography
//             variant="body1"
//             textAlign="center"
//             sx={{ mb: 4, color: "text.secondary", cursor: "pointer" }}
//             onClick={onRedirectToLogin}
//           >
//             Ir para login.
//           </Typography>
//         </>
//       )}
//     </Box>
//   );
// };
"use client";
import { resendEmailConfirmation } from "@/lib/api/auth/confirm-email/resendConfirmEmailApi";
import { ConfirmationSideProps } from "@/modules/auth/schemas/confirmationSideProps.schema";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

export const ConfirmationSide = ({
  onRedirectToLogin,
  status,
  countdown: initialCountdown,
  email,
}: ConfirmationSideProps & { email?: string }) => {
  const isVerified = status === "verified";
  const isInvalid = status === "invalid" || status === "error";

  const [countdown, setCountdown] = useState(initialCountdown ?? 3);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const totalCountdownDuration = initialCountdown ?? 3;

  useEffect(() => {
    let timer: number | NodeJS.Timeout;

    if (isVerified && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (isVerified && countdown === 0) {
      onRedirectToLogin();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isVerified, onRedirectToLogin]);

  const progressValue =
    countdown === 0
      ? 100
      : ((totalCountdownDuration - countdown) / totalCountdownDuration) * 100;

  const handleResendLink = async () => {
    if (!email) {
      setMessage("Email não fornecido. Tente fazer login novamente.");
      return;
    }

    console.log("Tentando reenviar para:", email);
    setLoading(true);
    setMessage(null);

    try {
      const res = await resendEmailConfirmation(email);
      console.log("Resposta da API:", res);
      setMessage(res.message);
    } catch (error) {
      console.error("Erro ao reenviar:", error);
      // ... resto do tratamento de erro
    } finally {
      setLoading(false);
    }
  };

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
          <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
            <CircularProgress
              variant="determinate"
              value={progressValue}
              size={60}
              thickness={5}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ fontSize: "1.2em", fontWeight: "bold" }}
              >
                {countdown}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            Você será redirecionado em segundos...
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

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ py: 1.5, mb: 2, maxWidth: "300px" }}
            onClick={handleResendLink}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Novo Link"}
          </Button>

          {message && (
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mb: 2, color: "success.main" }}
            >
              {message}
            </Typography>
          )}

          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mb: 4, color: "text.secondary", cursor: "pointer" }}
            onClick={onRedirectToLogin}
          >
            Ir para login.
          </Typography>
        </>
      )}
    </Box>
  );
};
