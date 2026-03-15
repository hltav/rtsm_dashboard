"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import ProfileContentPage from "./ProfileContentPage";
import PasswordRedefination from "./components/PasswordRedefination";
import { forgotPasswordApi } from "@/lib/api/auth/forgot-password/forgotPasswordApi";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { AppTabs } from "../ui/DisplayTab";

type ProfileTab = "profile_data" | "security" | "payment";

const TABS: Array<{ label: string; value: ProfileTab }> = [
  { label: "Dados do Perfil", value: "profile_data" },
  { label: "Segurança", value: "security" },
  { label: "Pagamento", value: "payment" },
];

const DEFAULT_TAB: ProfileTab = "profile_data";

const isProfileTab = (v: string | null): v is ProfileTab =>
  v === "profile_data" || v === "security" || v === "payment";

const ProfileContainerPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { showNotification } = useNotification();

  const tabFromUrl = useMemo<ProfileTab>(() => {
    const segments = pathname.split("/").filter(Boolean);
    const currentTab = segments[1] ?? null;

    return isProfileTab(currentTab) ? currentTab : DEFAULT_TAB;
  }, [pathname]);

  const [tab, setTab] = useState<ProfileTab>(tabFromUrl);

  useEffect(() => {
    setTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleTabChange = (newTab: ProfileTab) => {
    setTab(newTab);
    router.push(`/profile/${newTab}`);
  };

  const handleResetPassword = async (email: string) => {
    try {
      const data = await forgotPasswordApi(email);

      showNotification(
        data.message ||
          "Se o email estiver registrado, um link de redefinição será enviado!",
        "success",
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
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ p: 0,  }}>
        <Typography variant="h4" component="h1" fontWeight="bold" mb={2}>
          Perfil
        </Typography>

        <AppTabs<ProfileTab>
          value={tab}
          onChange={handleTabChange}
          tabs={TABS}
          scrollable
          sx={{ width: "80vw" }}
        />

        {tab === "profile_data" && (
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

        {tab === "security" && (
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                width: "100%",
              }}
            >
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
                <PasswordRedefination onSubmit={handleResetPassword} />
              </Box>
            </Box>
          </Box>
        )}

        {tab === "payment" && (
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                width: "100%",
              }}
            >
              <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
                Em breve
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProfileContainerPage;
