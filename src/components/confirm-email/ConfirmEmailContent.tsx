"use client";

import { ConfirmationSide } from "@/components/confirm-email/ConfirmationSide";
import { MarketingSide } from "@/components/confirm-email/MarketingSide";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ConfirmEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "loading" | "verified" | "invalid" | "error"
  >("loading");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const redirectTo = searchParams.get("redirectTo");

      if (!token) {
        setStatus("invalid");
        return;
      }

      try {
        const response = await fetch("/api/auth/confirm-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        console.log("Token sendo enviado:", token);

        if (response.ok) {
          setStatus("verified");

          if (redirectTo) {
            const timer = setInterval(() => {
              setCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(timer);
                  window.location.href = redirectTo;
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);

            return () => clearInterval(timer);
          }
        } else {
          const errorData = await response.json();
          console.error("Erro na verificação:", errorData);
          setStatus("invalid");
        }
      } catch (error) {
        console.error("Erro ao verificar e-mail:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams]);

  const handleRedirectToLogin = () => {
    router.push("/login");
  };

  if (status === "loading") {
    return (
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
  }

  return (
    <ThemeRegistry>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: { xs: 2, sm: 3, md: 0 },
        }}
      >
        <Container
          disableGutters={true}
          maxWidth={false}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: 3,
              overflow: "hidden",
              width: "95%",
              maxWidth: { xs: "95%", sm: "600px", md: "800px" },
              maxHeight: { xs: "unset", md: "calc(90vh - 40px)" },
              margin: { xs: "0 auto", md: "20px auto" },
            }}
          >
            <MarketingSide />
            <ConfirmationSide
              onRedirectToLogin={handleRedirectToLogin}
              status={status}
              countdown={countdown}
            />
          </Paper>
        </Container>
      </Box>
    </ThemeRegistry>
  );
};

export default ConfirmEmailContent;
