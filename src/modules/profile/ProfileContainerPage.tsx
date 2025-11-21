"use client";
import { Box, Container, Typography, Tabs, Tab } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProfileContentPage from "./ProfileContentPage";
// import ZoomLineChart from "../dashboard/charts/ZoomLineChart";
import PasswordRedefination from "./components/PasswordRedefination";
import { forgotPasswordApi } from "@/lib/api/auth/forgot-password/forgotPasswordApi";
import { useNotification } from "@/components/Providers/NotificationSnackbar";

const ProfileContainerPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {showNotification} = useNotification()

  const initialTab = Number(searchParams.get("tab") || 0);
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    setTab(Number(searchParams.get("tab") || 0));
  }, [searchParams]);

  const handleChange = (_: unknown, newValue: number) => {
    setTab(newValue);
    router.push(`/dashboard?tab=${newValue}`);
  };

  const handleResetPassword = async (email: string) => {
    try {
      const data = await forgotPasswordApi(email);

      showNotification(
        data.message ||
          "Se o email estiver registrado, um link de redefinição será enviado!",
        "success"
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      console.error("Erro no forgot-password:", err);
      const message =
        err instanceof Error ? err.message : "Erro interno no servidor.";
      showNotification(message, "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        p: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth={false} sx={{ p: 0 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" mb={2}>
          Perfil
        </Typography>

        <Tabs
          value={tab}
          onChange={handleChange}
          sx={(theme) => ({
            mb: 4,
            "& .MuiTab-root": {
              color: theme.palette.text.primary,
            },
            "& .Mui-selected": {
              color: theme.palette.secondary.contrastText + " !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.secondary.contrastText,
            },
          })}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Dados do Perfil" />
          <Tab label="Segurança" />
          {/* <Tab label="Pagamento" /> */}
        </Tabs>

        {tab === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              mt: 4,
              width: "100%",
            }}
          >
            <ProfileContentPage />
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                mt: 4,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 50%" },
                }}
              >
                <PasswordRedefination onSubmit={handleResetPassword} />
              </Box>
            </Box>
          </Box>
        )}

        {/* {tab === 2 && (
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                mt: 4,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 50%" },
                }}
              >
                <ZoomLineChart />
              </Box>
            </Box>
          </Box>
        )} */}
      </Container>
    </Box>
  );
};

export default ProfileContainerPage;
