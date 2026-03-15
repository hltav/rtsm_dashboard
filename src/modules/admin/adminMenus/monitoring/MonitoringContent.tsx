"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Monitoring from "./Monitoring";
import Queue from "./Queue";
import { AppTabs } from "../../../ui/DisplayTab";

type MonitoringTab = "overview" | "jobs" | "queues" | "logs";

const TABS: Array<{ label: string; value: MonitoringTab }> = [
  { label: "Visão Geral", value: "overview" },
  { label: "Fila", value: "queues" },
  { label: "Jobs", value: "jobs" },
  { label: "Logs", value: "logs" },
];

const MonitoringContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialTab = (searchParams.get("tab") as MonitoringTab) || "overview";
  const [tab, setTab] = useState<MonitoringTab>(initialTab);

  useEffect(() => {
    const next = (searchParams.get("tab") as MonitoringTab) || "overview";
    setTab(next);
  }, [searchParams]);

  const handleTabChange = (newTab: MonitoringTab) => {
    setTab(newTab);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth={false} disableGutters sx={{ p: 0 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" mb={2}>
          Monitoramento de Sistema
        </Typography>

        <AppTabs<MonitoringTab>
          value={tab}
          onChange={handleTabChange}
          tabs={TABS}
          scrollable
        />

        {tab === "overview" && <Monitoring />}
        {tab === "queues" && <Queue />}
        {tab === "jobs" && (
          <Typography color="text.secondary">Em breve</Typography>
        )}
        {tab === "logs" && (
          <Typography color="text.secondary">Em breve</Typography>
        )}
      </Container>
    </Box>
  );
};

export default MonitoringContent;
