"use client";
import { Box, Container, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useBankrollContext } from "@/components/Providers/BankrollContext";
import DashboardMainPage from "./main/DashboardMain";
import { AppTabs } from "@/modules/ui/DisplayTab";
// import MonthlyPLChart from "../charts/main/MonthlyPLChart";
// import ZoomLineChart from "../charts/ZoomLineChart";

type DashboardMainTab = "overview" | "other_data";

const DASHBOARD_MAIN_TABS: Array<{ label: string; value: DashboardMainTab }> = [
  { label: "Visão Geral", value: "overview" },
  { label: "Outros Dados", value: "other_data" },
];

const DEFAULT_TAB: DashboardMainTab = "overview";

const isDashboardMainTab = (v: string | null): v is DashboardMainTab =>
  v === "overview" || v === "other_data";

const MainContent: React.FC = () => {
  const { isLoading } = useBankrollContext();

  const router = useRouter();
  const pathname = usePathname();

  const tabFromUrl = useMemo<DashboardMainTab>(() => {
    const segments = pathname.split("/").filter(Boolean);
    const currentTab = segments[2] ?? null;

    return isDashboardMainTab(currentTab) ? currentTab : DEFAULT_TAB;
  }, [pathname]);

  const [tab, setTab] = useState<DashboardMainTab>(tabFromUrl);

  useEffect(() => {
    setTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleTabChange = (newTab: DashboardMainTab) => {
    setTab(newTab);
    router.push(`/dashboard/main/${newTab}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{ p: 0, overflowX: "hidden", minHeight: "100%" }}
      >
        {isLoading ? (
          <Box
            sx={{
              minHeight: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Carregando bancas...</Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h4" component="h1" fontWeight="bold" mb={2}>
              Dashboard
            </Typography>

            <AppTabs<DashboardMainTab>
              value={tab}
              onChange={handleTabChange}
              tabs={DASHBOARD_MAIN_TABS}
              scrollable
              sx={{ minWidth: "83.8vw", width: "100%" }}
            />

            {tab === "overview" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                  mt: 4,
                  width: "100%",
                }}
              >
                <DashboardMainPage />
              </Box>
            )}

            {tab === "other_data" && (
              <Typography color="text.secondary" sx={{ mt: 4 }}>
                Em breve
              </Typography>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default MainContent;
