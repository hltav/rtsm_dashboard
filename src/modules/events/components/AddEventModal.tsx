import React, { useState } from "react";
import { Box, Modal, Typography, SelectChangeEvent } from "@mui/material";
import { modalStyle } from "../interfaces/modalStyle";
import { EventBasicInfo } from "./addEvents/EventBasicInfo";
import { EventDetails } from "./addEvents/EventDetails";
import { EventResultSelect } from "./addEvents/EventResultSelect";
import { ModalEventActions } from "./addEvents/EventActions";
import { createEvent } from "@/lib/api/events/eventsApi";
import { useAuth } from "@/components/Providers/AuthContext";
import {
  EventItem,
  EventItemSchema,
} from "@/modules/events/interfaces/EventItem";
import { ZodError, ZodIssue } from "zod";
import { initialEventState } from "../interfaces/initialEventsStates";

const AddEventModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { user } = useAuth();

  const [newEvent, setNewEvent] =
    useState<Omit<EventItem, "id">>(initialEventState);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleNewEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewEvent((prev) => ({
      ...prev,
      [name]:
        name === "amount" || name === "odd" || name === "bankId"
          ? Number(value)
          : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (!name) return;

    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleOddChange = (odd: string) => {
    setNewEvent((prev) => ({
      ...prev,
      odd,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      console.error("Usuário não autenticado!");
      return;
    }

    try {
      const validationSchema = EventItemSchema.omit({ id: true });
      const validatedEvent = validationSchema.parse({
        ...newEvent,
        userId: user.id,
      });

      const payload = {
        ...validatedEvent,
        eventType:
          validatedEvent.eventType === "" ? null : validatedEvent.eventType,
        market: validatedEvent.market,
      };

      await createEvent(payload, user.id, newEvent.bankId);

      setNewEvent(initialEventState);
      setValidationErrors({});
      onClose();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};

        error.issues.forEach((issue: ZodIssue) => {
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
      <Box sx={modalStyle} component="form" onSubmit={handleSave}>
        <Typography variant="h5" component="h2" mb={4}>
          Novo Evento
        </Typography>

        <EventBasicInfo
          newEvent={newEvent}
          onNewEventChange={handleNewEventChange}
          onSelectChange={handleSelectChange}
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
