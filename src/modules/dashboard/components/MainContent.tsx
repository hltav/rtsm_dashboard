"use client";
import { Box, Container, Typography, Tabs, Tab } from "@mui/material";
import ZoomLineChart from "../charts/ZoomLineChart";
import { useBankrollContext } from "@/components/Providers/BankrollContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DashboardMainPage from "./main/DashboardMain";
import MonthlyPLChart from "../charts/main/MonthlyPLChart";

const MainContent: React.FC = () => {
  const { isLoading } = useBankrollContext();

  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = Number(searchParams.get("tab") || 0);
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    setTab(Number(searchParams.get("tab") || 0));
  }, [searchParams]);

  const handleChange = (_: unknown, newValue: number) => {
    setTab(newValue);
    router.push(`/dashboard?tab=${newValue}`);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          p: { xs: 2, sm: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Carregando bancas...</Typography>
      </Box>
    );
  }

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
          Dashboard
        </Typography>

        <Tabs
          value={tab}
          onChange={handleChange}
          sx={{ mb: 4 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Evolução da Banca" />
          <Tab label="Outros Dados" />
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
            <DashboardMainPage />
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
                <MonthlyPLChart />
              </Box>

              <Box
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 50%" },
                }}
              >
                <ZoomLineChart />
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MainContent;
