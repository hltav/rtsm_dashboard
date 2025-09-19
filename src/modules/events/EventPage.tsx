/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  SelectChangeEvent,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import { EventItem } from "./interfaces/EventItem";
import { darkTheme } from "@/components/theme/dark-theme";
import EventActions from "./components/EventActions";
import EventTable from "./components/EventTable";
import AddEventModal from "./components/AddEventModal";
import EditEventModal from "./components/EditEventModal";
import EventInfoModal from "./components/EventInfoModal";
import FilterModal from "./components/FilterModal";
import { initialEvents } from "./interfaces/initialEvents";

const EventPage = () => {
  const isMobile = useMediaQuery(darkTheme.breakpoints.down("sm"));

  const [events, setEvents] = useState<EventItem[]>([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [newEvent, setNewEvent] = useState<Omit<EventItem, "id">>({
    category: "",
    eventType: "",
    event: "",
    market: "",
    amount: 0,
    result: "",
  });
  const [selectedEventForInfo, setSelectedEventForInfo] =
    useState<EventItem | null>(null);
  const [selectedEventForEdit, setSelectedEventForEdit] =
    useState<EventItem | null>(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterEventType, setFilterEventType] = useState("");
  const [filterEvent, setFilterEvent] = useState("");
  const [filterMarket, setFilterMarket] = useState("");
  const [filterAmountRange, setFilterAmountRange] = useState("");
  const [filterResult, setFilterResult] = useState("");

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewEvent({
      category: "",
      eventType: "",
      event: "",
      market: "",
      amount: 0,
      result: "",
    });
  };

  const handleNewEventChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newEvent.category ||
      !newEvent.eventType ||
      !newEvent.event ||
      !newEvent.market ||
      newEvent.amount === 0 ||
      !newEvent.result
    ) {
      console.error("Por favor, preencha todos os campos.");
      return;
    }

    const amountNum = parseFloat(String(newEvent.amount));

    if (isNaN(amountNum) || amountNum <= 0) {
      console.error(
        "Valor da unidade apostada deve ser um número válido e maior que zero."
      );
      return;
    }

    const newId = Date.now().toString();
    setEvents((prev) => [
      ...prev,
      {
        id: newId,
        category: newEvent.category,
        eventType: newEvent.eventType,
        event: newEvent.event,
        market: newEvent.market,
        amount: amountNum,
        result: newEvent.result,
      },
    ]);
    handleCloseAddModal();
  };

  const handleOpenInfoModal = (eventItem: EventItem) => {
    setSelectedEventForInfo(eventItem);
    setOpenInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setOpenInfoModal(false);
    setSelectedEventForInfo(null);
  };

  const handleOpenEditModal = (eventItem: EventItem) => {
    setSelectedEventForEdit({ ...eventItem });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedEventForEdit(null);
  };

  const handleEditedEventChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setSelectedEventForEdit((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSaveEditedEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedEventForEdit?.category ||
      !selectedEventForEdit?.eventType ||
      !selectedEventForEdit?.event ||
      !selectedEventForEdit?.market ||
      selectedEventForEdit?.amount === 0 ||
      !selectedEventForEdit?.result
    ) {
      console.error("Por favor, preencha todos os campos para edição.");
      return;
    }

    const amountNum = parseFloat(String(selectedEventForEdit.amount));

    if (isNaN(amountNum) || amountNum <= 0) {
      console.error(
        "Valor da unidade apostada deve ser um número válido e maior que zero para edição."
      );
      return;
    }

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventForEdit.id
          ? { ...selectedEventForEdit, amount: amountNum }
          : event
      )
    );
    handleCloseEditModal();
  };

  const handleFilterChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "category":
        setFilterCategory(value);
        break;
      case "eventType":
        setFilterEventType(value);
        break;
      case "event":
        setFilterEvent(value);
        break;
      case "market":
        setFilterMarket(value);
        break;
      case "amountRange":
        setFilterAmountRange(value);
        break;
      case "result":
        setFilterResult(value);
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setFilterCategory("");
    setFilterEventType("");
    setFilterEvent("");
    setFilterMarket("");
    setFilterAmountRange("");
    setFilterResult("");
  };

  const uniqueCategories = Array.from(new Set(events.map((e) => e.category)));
  const uniqueEventTypes = Array.from(new Set(events.map((e) => e.eventType)));
  const uniqueEvents = Array.from(new Set(events.map((e) => e.event)));
  const uniqueMarkets = Array.from(new Set(events.map((e) => e.market)));
  const amountRanges = ["", "0-10", "10-20", "20-50", "50+"];

  const filteredEvents = events.filter((event) => {
    let amountValid = true;
    if (filterAmountRange) {
      const [minStr, maxStr] = filterAmountRange.split("-");
      const min = parseInt(minStr, 10);
      const max = maxStr && maxStr !== "+" ? parseInt(maxStr, 10) : Infinity;
      amountValid = event.amount >= min && event.amount <= max;
    }

    return (
      (filterCategory === "" || event.category === filterCategory) &&
      (filterEventType === "" || event.eventType === filterEventType) &&
      (filterEvent === "" || event.event === filterEvent) &&
      (filterMarket === "" || event.market === filterMarket) &&
      amountValid &&
      (filterResult === "" || event.result === filterResult)
    );
  });
  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
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

          <EventTable
            events={filteredEvents}
            isMobile={isMobile}
            onInfoClick={(event) => {
              setSelectedEventForInfo(event);
              setOpenInfoModal(true);
            }}
            onEditClick={(event) => {
              setSelectedEventForEdit(event);
              setOpenEditModal(true);
            }}
          />

          <AddEventModal
            open={openAddModal}
            onClose={() => {
              setOpenAddModal(false);
              setNewEvent({
                category: "",
                eventType: "",
                event: "",
                market: "",
                amount: 0,
                result: "",
              });
            }}
            newEvent={newEvent}
            onNewEventChange={handleNewEventChange}
            onSelectChange={handleNewEventChange}
            onSave={handleSaveNewEvent}
          />

          <EditEventModal
            open={openEditModal}
            onClose={() => {
              setOpenEditModal(false);
              setSelectedEventForEdit(null);
            }}
            event={selectedEventForEdit}
            onChange={handleEditedEventChange}
            onSelectChange={handleEditedEventChange}
            onSave={handleSaveEditedEvent}
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
            filters={{
              category: filterCategory,
              eventType: filterEventType,
              event: filterEvent,
              market: filterMarket,
              amountRange: filterAmountRange,
              result: filterResult,
            }}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            uniqueCategories={uniqueCategories}
            uniqueEventTypes={uniqueEventTypes}
            uniqueEvents={uniqueEvents}
            uniqueMarkets={uniqueMarkets}
            amountRanges={amountRanges}
          />
        </Container>
      </Box>
    </div>
  );
};

export default EventPage;
