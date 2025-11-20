// "use client";
// import React, { useState } from "react";
// import { Box, Modal, Typography, SelectChangeEvent } from "@mui/material";
// import { modalStyle } from "../interfaces/modalStyle";
// import { EventBasicInfo } from "./addEvents/EventBasicInfo";
// import { EventDetails } from "./addEvents/EventDetails";
// import { EventResultSelect } from "./addEvents/EventResultSelect";
// import { ModalEventActions } from "./addEvents/EventActions";
// import { createEvent } from "@/lib/api/events/eventsApi";
// import { useAuth } from "@/components/Providers/AuthContext";
// import {
//   FullEventSchema,
//   FullEvent,
// } from "@/modules/events/schemas/EventItem";
// import { ZodError } from "zod";
// import { initialEventState } from "../interfaces/initialEventsStates";
// import { theSportsDbService } from "@/lib/api/theSportsDb/apiTheSportsDb";
// import { League } from "@/lib/api/theSportsDb/interface/theSportsDb.interface";

// const AddEventModal: React.FC<{
//   open: boolean;
//   onClose: () => void;
//   onAdd?: (newEvent: FullEvent) => void;
// }> = ({ open, onClose, onAdd }) => {
//   const { user } = useAuth();

//   const [newEvent, setNewEvent] =
//     useState<Omit<FullEvent, "id">>(initialEventState);
//   const [validationErrors, setValidationErrors] = useState<
//     Record<string, string>
//   >({});

//   const handleNewEventChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewEvent((prev) => ({
//       ...prev,
//       [name]: ["amount", "odd", "bankId"].includes(name)
//         ? Number(value)
//         : value,
//     }));

//     if (validationErrors[name]) {
//       const newErrors = { ...validationErrors };
//       delete newErrors[name];
//       setValidationErrors(newErrors);
//     }
//   };

//   const handleSelectChange = (e: SelectChangeEvent<string>) => {
//     const { name, value } = e.target;
//     if (!name) return;
//     setNewEvent((prev) => ({ ...prev, [name]: value }));

//     if (validationErrors[name]) {
//       const newErrors = { ...validationErrors };
//       delete newErrors[name];
//       setValidationErrors(newErrors);
//     }
//   };

//   const handleOddChange = (odd: string) => {
//     setNewEvent((prev) => ({ ...prev, odd }));
//   };

//   const handleEventSelect = async (apiEventId: string) => {
//     try {
//       const event = await theSportsDbService.getEventById(apiEventId);

//       if (!event) {
//         return;
//       }

//       let leagueData: League | null = null;

//       const leagueId = event.idLeague ?? null;

//       if (leagueId) {
//         leagueData = await theSportsDbService.getLeagueById(String(leagueId));
//       } else {
//         console.warn("⚠️ Evento não possui idLeague");
//       }

//       setNewEvent((prev) => ({
//         ...prev,
//         event: event.strEvent,
//         apiEventId: event.idEvent,
//         homeTeam: event.strHomeTeam || null,
//         awayTeam: event.strAwayTeam || null,
//         eventDate: event.strTimestamp || null,
//         strCountry: event.strCountry || null,
//         league: leagueData?.strLeague || event.strLeague || prev.league,
//         strBadge: leagueData?.strBadge || null,
//         strLeague: leagueData?.strLeague || null,
//         strHomeTeamBadge: event.strHomeTeamBadge || null,
//         strAwayTeamBadge: event.strAwayTeamBadge || null,
//         strTimestamp: event.strTimestamp || null,
//         strTime: event.strTime || null,
//         strTimeLocal: event.strTimeLocal || null,
//         dateEvent: event.dateEvent || null,
//         dateEventLocal: event.dateEventLocal || null,
//       }));
//     } catch (err) {
//       console.error("❌ Erro ao buscar evento externo:", err);
//     }
//   };

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!user?.id) {
//       console.error("Usuário não autenticado!");
//       return;
//     }

//     try {
//       const validatedEvent = FullEventSchema.omit({ id: true }).parse({
//         ...newEvent,
//         userId: user.id,
//         eventType: newEvent.eventType === "" ? null : newEvent.eventType,
//       });

//       const savedEvent = await createEvent(
//         validatedEvent,
//         user.id,
//         validatedEvent.bankId
//       );

//       onAdd?.(savedEvent);

//       setNewEvent(initialEventState);
//       setValidationErrors({});
//       onClose();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const errors: Record<string, string> = {};
//         error.issues.forEach((issue) => {
//           const field = issue.path[0] as string;
//           errors[field] = issue.message;
//         });
//         setValidationErrors(errors);
//         console.error("Erros de validação:", errors);
//       } else {
//         console.error("Erro ao criar evento:", error);
//       }
//     }
//   };

//   const handleClose = () => {
//     setNewEvent(initialEventState);
//     setValidationErrors({});
//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={modalStyle} component="form" onSubmit={handleSave}>
//         <Typography variant="h5" component="h2" mb={4}>
//           Novo Evento
//         </Typography>

//         <EventBasicInfo
//           newEvent={newEvent}
//           onNewEventChange={handleNewEventChange}
//           onSelectChange={(e) => {
//             handleSelectChange(e);
//             if (e.target.name === "event") handleEventSelect(e.target.value);
//           }}
//           validationErrors={validationErrors}
//         />
//         <EventDetails
//           newEvent={newEvent}
//           onNewEventChange={handleNewEventChange}
//           validationErrors={validationErrors}
//         />
//         <EventResultSelect
//           newEvent={newEvent}
//           onSelectChange={handleSelectChange}
//           onOddChange={handleOddChange}
//           validationErrors={validationErrors}
//         />
//         <ModalEventActions onClose={handleClose} />
//       </Box>
//     </Modal>
//   );
// };

// export default AddEventModal;

"use client";
import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { modalStyle } from "../interfaces/modalStyle";
import { EventBasicInfo } from "./addEvents/EventBasicInfo";
import { EventDetails } from "./addEvents/EventDetails";
import { EventResultSelect } from "./addEvents/EventResultSelect";
import { ModalEventActions } from "./addEvents/EventActions";
import { createEvent } from "@/lib/api/events/eventsApi";
import { useAuth } from "@/components/Providers/AuthContext";
import { FullEventSchema, FullEvent } from "@/modules/events/schemas/EventItem";
import { ZodError } from "zod";
import { initialEventState } from "../interfaces/initialEventsStates";
import { theSportsDbService } from "@/lib/api/theSportsDb/apiTheSportsDb";
import { League } from "@/lib/api/theSportsDb/interface/theSportsDb.interface";

const AddEventModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onAdd?: (newEvent: FullEvent) => void;
}> = ({ open, onClose, onAdd }) => {
  const theme = useTheme();
  const { user } = useAuth();

  const [newEvent, setNewEvent] =
    useState<Omit<FullEvent, "id">>(initialEventState);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleNewEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: ["amount", "odd", "bankId"].includes(name)
        ? Number(value)
        : value,
    }));

    if (validationErrors[name]) {
      const newErrors = { ...validationErrors };
      delete newErrors[name];
      setValidationErrors(newErrors);
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (!name) return;
    setNewEvent((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      const newErrors = { ...validationErrors };
      delete newErrors[name];
      setValidationErrors(newErrors);
    }
  };

  const handleOddChange = (odd: string) => {
    setNewEvent((prev) => ({ ...prev, odd }));
  };

  const handleEventSelect = async (apiEventId: string) => {
    try {
      const event = await theSportsDbService.getEventById(apiEventId);

      if (!event) {
        return;
      }

      let leagueData: League | null = null;

      const leagueId = event.idLeague ?? null;

      if (leagueId) {
        leagueData = await theSportsDbService.getLeagueById(String(leagueId));
      } else {
        console.warn("⚠️ Evento não possui idLeague");
      }

      setNewEvent((prev) => ({
        ...prev,
        event: event.strEvent,
        apiEventId: event.idEvent,
        homeTeam: event.strHomeTeam || null,
        awayTeam: event.strAwayTeam || null,
        eventDate: event.strTimestamp || null,
        strCountry: event.strCountry || null,
        league: leagueData?.strLeague || event.strLeague || prev.league,
        strBadge: leagueData?.strBadge || null,
        strLeague: leagueData?.strLeague || null,
        strHomeTeamBadge: event.strHomeTeamBadge || null,
        strAwayTeamBadge: event.strAwayTeamBadge || null,
        strTimestamp: event.strTimestamp || null,
        strTime: event.strTime || null,
        strTimeLocal: event.strTimeLocal || null,
        dateEvent: event.dateEvent || null,
        dateEventLocal: event.dateEventLocal || null,
      }));
    } catch (err) {
      console.error("❌ Erro ao buscar evento externo:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      console.error("Usuário não autenticado!");
      return;
    }

    try {
      const validatedEvent = FullEventSchema.omit({ id: true }).parse({
        ...newEvent,
        userId: user.id,
        eventType: newEvent.eventType === "" ? null : newEvent.eventType,
      });

      const savedEvent = await createEvent(
        validatedEvent,
        user.id,
        validatedEvent.bankId
      );

      onAdd?.(savedEvent);

      setNewEvent(initialEventState);
      setValidationErrors({});
      onClose();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          errors[field] = issue.message;
        });
        setValidationErrors(errors);
        console.error("Erros de validação:", errors);
      } else {
        console.error("Erro ao criar evento:", error);
      }
    }
  };

  const handleClose = () => {
    setNewEvent(initialEventState);
    setValidationErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          ...modalStyle,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        component="form"
        onSubmit={handleSave}
      >
        <Typography
          variant="h5"
          component="h2"
          mb={4}
          sx={{ color: theme.palette.text.primary }}
        >
          Novo Evento
        </Typography>

        <EventBasicInfo
          newEvent={newEvent}
          onNewEventChange={handleNewEventChange}
          onSelectChange={(e) => {
            handleSelectChange(e);
            if (e.target.name === "event") handleEventSelect(e.target.value);
          }}
          validationErrors={validationErrors}
        />
        <EventDetails
          newEvent={newEvent}
          onNewEventChange={handleNewEventChange}
          validationErrors={validationErrors}
        />
        <EventResultSelect
          newEvent={newEvent}
          onSelectChange={handleSelectChange}
          onOddChange={handleOddChange}
          validationErrors={validationErrors}
        />
        <ModalEventActions onClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default AddEventModal;
