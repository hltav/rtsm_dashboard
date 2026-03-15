"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { AppTabs } from "../ui/DisplayTab";
import BankrollPageContent from "./BankrollPageContent";
import BankrollDetail from "./components/BankrollDetail";

type BankrollTab =
  | "bankroll"
  | "details"
  | "transactions"
  | "reports"
  | "settings";

const TABS: Array<{ label: string; value: BankrollTab }> = [
  { label: "Minhas Bancas", value: "bankroll" },
  { label: "Detalhes", value: "details" },
  { label: "Transações", value: "transactions" },
  { label: "Relatórios", value: "reports" },
  { label: "Configurações", value: "settings" },
];

const DEFAULT_TAB: BankrollTab = "bankroll";

const isBankrollTab = (v: string | null): v is BankrollTab =>
  v === "bankroll" ||
  v === "details" ||
  v === "transactions" ||
  v === "reports" ||
  v === "settings";

const BankrollContainerPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabFromUrl = useMemo<BankrollTab>(() => {
    const segments = pathname.split("/").filter(Boolean);
    const currentTab = segments[1] ?? null;

    return isBankrollTab(currentTab) ? currentTab : DEFAULT_TAB;
  }, [pathname]);

  const [tab, setTab] = useState<BankrollTab>(tabFromUrl);

  useEffect(() => {
    setTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleTabChange = (newTab: BankrollTab) => {
    setTab(newTab);
    router.push(`/bankroll/${newTab}`);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Container
        maxWidth={false}
        sx={{ width: "100%", maxWidth: "100%", overflowX: "hidden", p: 0 }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" mb={2}>
          Bancas
        </Typography>

        <AppTabs<BankrollTab>
          value={tab}
          onChange={handleTabChange}
          tabs={TABS}
          scrollable
          sx={{ width: "80vw" }}
        />

        {tab === "bankroll" && (
          <Box sx={{ mt: 4, width: "100%" }}>
            <BankrollPageContent />
          </Box>
        )}

        {tab === "details" && (
          <Box sx={{ mt: 4, width: "100%" }}>
            <BankrollDetail />
          </Box>
        )}

        {tab === "transactions" && (
          <Box sx={{ mt: 4, width: "100%" }}>Em breve (Transações)</Box>
        )}

        {tab === "reports" && (
          <Box sx={{ mt: 4, width: "100%" }}>Em breve (Relatórios)</Box>
        )}

        {tab === "settings" && (
          <Box sx={{ mt: 4, width: "100%" }}>Em breve (Configurações)</Box>
        )}
      </Container>
    </Box>
  );
};

export default BankrollContainerPage;