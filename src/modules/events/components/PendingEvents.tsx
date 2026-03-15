"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  useMediaQuery,
  SelectChangeEvent,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import { darkTheme } from "@/components/theme/dark-theme";
import { useBankrolls } from "@/modules/bankroll/hook/useBankrolls";
import { useEvents } from "../hooks/useEvents";
import { FullBet } from "../schemas/EventItem";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import EventActions from "./EventActions";
import EventInfoModal from "./EventInfoModal";
import EventTable from "./EventTable";
import FilterModal from "./FilterModal";

const PendingEvents = () => {
  const { events, loading, refetch } = useEvents();
  const isMobile = useMediaQuery(darkTheme.breakpoints.down("sm"));
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedEventForInfo, setSelectedEventForInfo] =
    useState<FullBet | null>(null);
  const [selectedEventForEdit, setSelectedEventForEdit] =
    useState<FullBet | null>(null);
  const [filters, setFilters] = useState({
    eventDescription: "",
    sports: "",
    league: "",
    market: "",
    amountRange: "",
    odd: "",
    bank: "",
    result: "",
    bankrollId: "",
  });

  const { data: bankrolls } = useBankrolls();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleFilterChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () =>
    setFilters({
      eventDescription: "",
      sports: "",
      league: "",
      market: "",
      amountRange: "",
      odd: "",
      bank: "",
      result: "",
      bankrollId: "",
    });

  const banksMap = useMemo(() => {
    if (!bankrolls) return new Map();
    return new Map(bankrolls.map((bank) => [bank.id, bank.name]));
  }, [bankrolls]);

  const pendingEvents = useMemo(
    () => events.filter((e) => e.result === "pending"),
    [events],
  );

  const filteredEvents = useMemo(() => {
    return pendingEvents.filter((event) => {
      const numericStake = Number(event.stake);

      let amountValid = true;
      if (filters.amountRange) {
        const [minStr, maxStr] = filters.amountRange.split("-");
        const min = Number(minStr);
        const max = maxStr && maxStr !== "+" ? Number(maxStr) : Infinity;
        amountValid = numericStake >= min && numericStake <= max;
      }

      const numericOdd = Number(event.odd);
      const filterOdd = filters.odd ? Number(filters.odd) : null;

      return (
        (!filters.eventDescription ||
          event.eventDescription
            .toLowerCase()
            .includes(filters.eventDescription.toLowerCase())) &&
        (!filters.sports || event.sport === filters.sports) &&
        (!filters.league || event.league === filters.league) &&
        (!filters.market || event.market === filters.market) &&
        amountValid &&
        (!filterOdd || numericOdd === filterOdd) &&
        (!filters.bankrollId ||
          event.bankrollId.toString() === filters.bankrollId) &&
        (!filters.result || event.result === filters.result)
      );
    });
  }, [pendingEvents, filters]);

  const uniqueEvents = Array.from(
    new Set(pendingEvents.map((e) => e.eventDescription)),
  );
  const uniqueSports = Array.from(new Set(pendingEvents.map((e) => e.sport)));
  const uniqueLeagues = Array.from(new Set(pendingEvents.map((e) => e.league)));
  const uniqueMarkets = Array.from(new Set(pendingEvents.map((e) => e.market)));
  const uniqueOdds = Array.from(new Set(pendingEvents.map((e) => e.odd)));
  const uniqueBanks = Array.from(
    new Set(
      pendingEvents
        .map((e) => banksMap.get(e.bankrollId))
        .filter((name): name is string => !!name),
    ),
  );
  const amountRanges = ["", "0-2", "3-4", "5+"];

  return (
    <div>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{ minWidth: "80vw", width: "100%", p: 0 }}
      >
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
          <Typography variant="h6" component="h1" fontWeight="bold">
            Novos Eventos e Eventos Pendentes
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
          uniqueSports={uniqueSports.filter((e): e is string => !!e)}
          uniqueLeagues={uniqueLeagues.filter((e): e is string => !!e)}
          uniqueMarkets={uniqueMarkets}
          amountRanges={amountRanges}
          uniqueOdds={uniqueOdds.filter((e): e is string => !!e)}
          uniqueBanks={uniqueBanks.filter((e): e is string => !!e)}
        />
      </Container>
    </div>
  );
};

export default PendingEvents;
