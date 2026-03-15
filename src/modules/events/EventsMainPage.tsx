"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { AppTabs } from "../ui/DisplayTab";
import PendingEvents from "./components/PendingEvents";
import FinishedEvents from "./components/FinishedEvents";

type EventsTab = "pending" | "finished" | "reports" | "settings";

const TABS: Array<{ label: string; value: EventsTab }> = [
  { label: "Pendentes", value: "pending" },
  { label: "Finalizados", value: "finished" },
  { label: "Relatórios", value: "reports" },
  { label: "Configurações", value: "settings" },
];

const DEFAULT_TAB: EventsTab = "pending";

const isEventsTab = (v: string | null): v is EventsTab =>
  v === "pending" || v === "finished" || v === "reports" || v === "settings";

const EventsMainPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabFromUrl = useMemo<EventsTab>(() => {
    const segments = pathname.split("/").filter(Boolean);
    const currentTab = segments[1] ?? null;

    return isEventsTab(currentTab) ? currentTab : DEFAULT_TAB;
  }, [pathname]);

  const [tab, setTab] = useState<EventsTab>(tabFromUrl);

  useEffect(() => {
    setTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleTabChange = (newTab: EventsTab) => {
    setTab(newTab);
    router.push(`/events/${newTab}`);
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
          Eventos
        </Typography>

        <AppTabs<EventsTab>
          value={tab}
          onChange={handleTabChange}
          tabs={TABS}
          scrollable
          sx={{ minWidth: "81.3vw", width: "100%" }}
        />

        {tab === "pending" && (
          <Box sx={{ mt: 4, width: "100%" }}>
            <PendingEvents />
          </Box>
        )}

        {tab === "finished" && (
          <Box sx={{ mt: 4, width: "100%" }}>
            <FinishedEvents />
          </Box>
        )}

        {tab === "reports" && (
          <Box sx={{ mt: 4, width: "100%" }}>
            <Typography color="text.secondary">
              Em breve (Relatórios)
            </Typography>
          </Box>
        )}

        {tab === "settings" && (
          <Box sx={{ mt: 4, width: "100%" }}>
            <Typography color="text.secondary">
              Em breve (Configurações)
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EventsMainPage;
