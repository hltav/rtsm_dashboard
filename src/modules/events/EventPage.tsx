"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  useMediaQuery,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import { darkTheme } from "@/components/theme/dark-theme";
import EventActions from "./components/EventActions";
import EventTable from "./components/EventTable";
import AddEventModal from "./components/AddEventModal";
import EditEventModal from "./components/EditEventModal";
import EventInfoModal from "./components/EventInfoModal";
import FilterModal from "./components/FilterModal";
import { useEvents } from "./hooks/useEvents";
import { EventItem } from "./schemas/EventItem";
import { useBankrolls } from "../bankroll/hook/useBankrolls";
import { useAuth } from "@/components/Providers/AuthContext";

const EventContentPage = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { events, loading, refetch } = useEvents();
  const isMobile = useMediaQuery(darkTheme.breakpoints.down("sm"));
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedEventForInfo, setSelectedEventForInfo] =
    useState<EventItem | null>(null);
  const [selectedEventForEdit, setSelectedEventForEdit] =
    useState<EventItem | null>(null);
  const [filters, setFilters] = useState({
    event: "",
    modality: "",
    league: "",
    market: "",
    amountRange: "",
    odd: "",
    bank: "",
    result: "",
    bankId: "",
  });
  const userId = user?.id;
  const { data: bankrolls } = useBankrolls(userId ?? 0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleFilterChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () =>
    setFilters({
      event: "",
      modality: "",
      league: "",
      market: "",
      amountRange: "",
      odd: "",
      bank: "",
      result: "",
      bankId: "",
    });

  const banksMap = useMemo(() => {
    if (!bankrolls) return new Map();
    return new Map(bankrolls.map((bank) => [bank.id, bank.name]));
  }, [bankrolls]);

  const filteredEvents = events.filter((event) => {
    let amountValid = true;
    if (filters.amountRange) {
      const [minStr, maxStr] = filters.amountRange.split("-");
      const min = parseInt(minStr, 10);
      const max = maxStr && maxStr !== "+" ? parseInt(maxStr, 10) : Infinity;
      amountValid = event.amount >= min && event.amount <= max;
    }

    const bankName = banksMap.get(event.bankId);

    return (
      (!filters.event || event.event === filters.event) &&
      (!filters.modality || event.modality === filters.modality) &&
      (!filters.league || event.league === filters.league) &&
      (!filters.market || event.market === filters.market) &&
      amountValid &&
      (!filters.odd || event.odd === filters.odd) &&
      (!filters.bank || bankName === filters.bank) &&
      (!filters.result || event.result === filters.result)
    );
  });

  const uniqueEvents = Array.from(new Set(events.map((e) => e.event)));
  const uniqueModalities = Array.from(new Set(events.map((e) => e.modality)));
  const uniqueLeagues = Array.from(new Set(events.map((e) => e.league)));
  const uniqueMarkets = Array.from(new Set(events.map((e) => e.market)));
  const uniqueOdds = Array.from(new Set(events.map((e) => e.odd)));
  const uniqueBanks = Array.from(
    new Set(
      events
        .map((e) => banksMap.get(e.bankId))
        .filter((name): name is string => !!name)
    )
  );
  const amountRanges = ["", "0-2", "3-4", "5+"];

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100%",
          bgcolor: theme.palette.background.default,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth={false} sx={{ p: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              mb: 4,
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ color: theme.palette.text.primary }}
            >
              Eventos
            </Typography>

            <EventActions
              isMobile={isMobile}
              onAddClick={() => setOpenAddModal(true)}
              onFilterClick={() => setOpenFilterModal(true)}
            />
          </Box>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                minHeight: "200px",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <EventTable
              events={filteredEvents}
              onInfoClick={(event) => {
                setSelectedEventForInfo(event);
                setOpenInfoModal(true);
              }}
              onEditClick={(event) => {
                setSelectedEventForEdit(event);
                setOpenEditModal(true);
              }}
              onEventDeleted={() => refetch()}
            />
          )}

          {/* Modais */}
          <AddEventModal
            open={openAddModal}
            onClose={() => setOpenAddModal(false)}
            onAdd={() => refetch()}
          />

          <EditEventModal
            open={openEditModal}
            onClose={() => {
              setOpenEditModal(false);
              setSelectedEventForEdit(null);
            }}
            onChange={() => {}}
            onSelectChange={() => {}}
            event={selectedEventForEdit}
            onSave={() => refetch()}
          />

          <EventInfoModal
            open={openInfoModal}
            onClose={() => {
              setOpenInfoModal(false);
              setSelectedEventForInfo(null);
            }}
            event={selectedEventForInfo}
          />

          <FilterModal
            open={openFilterModal}
            onClose={() => setOpenFilterModal(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            uniqueEvents={uniqueEvents}
            uniqueModalities={uniqueModalities.filter((e): e is string => !!e)}
            uniqueLeagues={uniqueLeagues.filter((e): e is string => !!e)}
            uniqueMarkets={uniqueMarkets}
            amountRanges={amountRanges}
            uniqueOdds={uniqueOdds.filter((e): e is string => !!e)}
            uniqueBanks={uniqueBanks.filter((e): e is string => !!e)}
          />
        </Container>
      </Box>
    </div>
  );
};

export default EventContentPage;
