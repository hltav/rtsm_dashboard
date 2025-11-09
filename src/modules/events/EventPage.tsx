"use client";
import React, { useState, useEffect } from "react";
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
import EventActions from "./components/EventActions";
import EventTable from "./components/EventTable";
import AddEventModal from "./components/AddEventModal";
import EditEventModal from "./components/EditEventModal";
import EventInfoModal from "./components/EventInfoModal";
import FilterModal from "./components/FilterModal";
import { useEvents } from "./hooks/useEvents";
import { EventItem } from "./schemas/EventItem";

const EventContentPage = () => {
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
    odd: "",
    eventType: "",
    event: "",
    market: "",
    amountRange: "",
    result: "",
  });

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
      odd: "",
      eventType: "",
      event: "",
      market: "",
      amountRange: "",
      result: "",
    });

  const filteredEvents = events.filter((event) => {
    let amountValid = true;
    if (filters.amountRange) {
      const [minStr, maxStr] = filters.amountRange.split("-");
      const min = parseInt(minStr, 10);
      const max = maxStr && maxStr !== "+" ? parseInt(maxStr, 10) : Infinity;
      amountValid = event.amount >= min && event.amount <= max;
    }

    return (
      (!filters.odd || event.odd === filters.odd) &&
      (!filters.eventType || event.eventType === filters.eventType) &&
      (!filters.event || event.event === filters.event) &&
      (!filters.market || event.market === filters.market) &&
      amountValid &&
      (!filters.result || event.result === filters.result)
    );
  });

  const uniqueCategories = Array.from(new Set(events.map((e) => e.odd)));
  const uniqueEventTypes = Array.from(new Set(events.map((e) => e.eventType)));
  const uniqueEvents = Array.from(new Set(events.map((e) => e.event)));
  const uniqueMarkets = Array.from(new Set(events.map((e) => e.market)));
  const amountRanges = ["", "0-10", "10-20", "20-50", "50+"];

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100%",
          bgcolor: "background.default",
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
            <Typography variant="h4" component="h1" fontWeight="bold">
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
            uniqueCategories={uniqueCategories}
            uniqueEventTypes={uniqueEventTypes.filter((e): e is string => !!e)}
            uniqueEvents={uniqueEvents}
            uniqueMarkets={uniqueMarkets}
            amountRanges={amountRanges}
          />
        </Container>
      </Box>
    </div>
  );
};

export default EventContentPage;
