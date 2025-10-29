"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  SelectChangeEvent,
  CircularProgress,
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
import { getEvents } from "@/lib/api/events/eventsApi";

const EventContentPage = () => {
  const isMobile = useMediaQuery(darkTheme.breakpoints.down("sm"));
  const [events, setEvents] = useState<EventItem[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedEventForInfo, setSelectedEventForInfo] =
    useState<EventItem | null>(null);
  const [selectedEventForEdit, setSelectedEventForEdit] =
    useState<EventItem | null>(null);
  const [filterOdd, setFilterOdd] = useState("");
  const [filterEventType, setFilterEventType] = useState("");
  const [filterEvent, setFilterEvent] = useState("");
  const [filterMarket, setFilterMarket] = useState("");
  const [filterAmountRange, setFilterAmountRange] = useState("");
  const [filterResult, setFilterResult] = useState("");

  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

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
      !selectedEventForEdit?.odd ||
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
        setFilterOdd(value);
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
    setFilterOdd("");
    setFilterEventType("");
    setFilterEvent("");
    setFilterMarket("");
    setFilterAmountRange("");
    setFilterResult("");
  };

  const uniqueCategories = Array.from(new Set(events.map((e) => e.odd)));
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
      (filterOdd === "" || event.odd === filterOdd) &&
      (filterEventType === "" || event.eventType === filterEventType) &&
      (filterEvent === "" || event.event === filterEvent) &&
      (filterMarket === "" || event.market === filterMarket) &&
      amountValid &&
      (filterResult === "" || event.result === filterResult)
    );
  });

  const filterNonNullable = (arr: (string | null | undefined)[]): string[] => {
    return arr.filter((item): item is string => item != null);
  };

  // return (
  //   <div>
  //     <CssBaseline />
  //     <Box
  //       sx={{
  //         minHeight: "100%",
  //         bgcolor: "background.default",
  //         p: { xs: 2, sm: 4 },
  //       }}
  //     >
  //       <Container maxWidth={false} sx={{ p: 0 }}>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             flexDirection: { xs: "column", sm: "row" },
  //             justifyContent: "space-between",
  //             alignItems: { xs: "stretch", sm: "center" },
  //             mb: 4,
  //             gap: { xs: 2, sm: 0 },
  //           }}
  //         >
  //           <Typography variant="h4" component="h1" fontWeight="bold">
  //             Eventos
  //           </Typography>

  //           <EventActions
  //             isMobile={isMobile}
  //             onAddClick={() => setOpenAddModal(true)}
  //             onFilterClick={() => setOpenFilterModal(true)}
  //           />
  //         </Box>

  //         <EventTable
  //           events={filteredEvents}
  //           onInfoClick={(event) => {
  //             setSelectedEventForInfo(event);
  //             setOpenInfoModal(true);
  //           }}
  //           onEditClick={(event) => {
  //             setSelectedEventForEdit(event);
  //             setOpenEditModal(true);
  //           }}
  //         />

  //         <AddEventModal
  //           open={openAddModal}
  //           onClose={() => {
  //             setOpenAddModal(false);
  //             setNewEvent({ ...initialEventState });
  //           }}
  //         />

  //         <EditEventModal
  //           open={openEditModal}
  //           onClose={() => {
  //             setOpenEditModal(false);
  //             setSelectedEventForEdit(null);
  //           }}
  //           event={selectedEventForEdit}
  //           onChange={handleEditedEventChange}
  //           onSelectChange={handleEditedEventChange}
  //           onSave={handleSaveEditedEvent}
  //         />

  //         <EventInfoModal
  //           open={openInfoModal}
  //           onClose={() => {
  //             setOpenInfoModal(false);
  //             setSelectedEventForInfo(null);
  //           }}
  //           event={selectedEventForInfo}
  //         />

  //         <FilterModal
  //           open={openFilterModal}
  //           onClose={() => setOpenFilterModal(false)}
  //           filters={{
  //             odd: filterOdd,
  //             eventType: filterEventType,
  //             event: filterEvent,
  //             market: filterMarket,
  //             amountRange: filterAmountRange,
  //             result: filterResult,
  //           }}
  //           onFilterChange={handleFilterChange}
  //           onClearFilters={handleClearFilters}
  //           uniqueCategories={filterNonNullable(uniqueCategories)}
  //           uniqueEventTypes={filterNonNullable(uniqueEventTypes)}
  //           uniqueEvents={filterNonNullable(uniqueEvents)}
  //           uniqueMarkets={filterNonNullable(uniqueMarkets)}
  //           amountRanges={amountRanges}
  //         />
  //       </Container>
  //     </Box>
  //   </div>
  // );

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

          {/* 👇 Aqui entra o loading visual */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
            />
          )}

          {/* Modais */}
          <AddEventModal
            open={openAddModal}
            onClose={() => {
              setOpenAddModal(false);
            }}
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
              odd: filterOdd,
              eventType: filterEventType,
              event: filterEvent,
              market: filterMarket,
              amountRange: filterAmountRange,
              result: filterResult,
            }}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            uniqueCategories={filterNonNullable(uniqueCategories)}
            uniqueEventTypes={filterNonNullable(uniqueEventTypes)}
            uniqueEvents={filterNonNullable(uniqueEvents)}
            uniqueMarkets={filterNonNullable(uniqueMarkets)}
            amountRanges={amountRanges}
          />
        </Container>
      </Box>
    </div>
  );
};

export default EventContentPage;
