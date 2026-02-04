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
import { createBet } from "@/lib/api/events/eventsApi";
import { FullBet } from "@/modules/events/schemas/EventItem";
import { ZodError } from "zod";
import { initialCreateBetState } from "../interfaces/initialEventsStates";
import { DiscoverFixture } from "@/lib/api/apiSports/soccer/schemas/discoveryFixture.schema";
import {
  CreateBetPayload,
  CreateBetSchema,
} from "../schemas/CreateBetPlay.schema";
import { imageProxyApi } from "@/lib/api/image/imageProxyApi";

const AddEventModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onAdd?: (newEvent: FullBet) => void;
}> = ({ open, onClose, onAdd }) => {
  const theme = useTheme();

  const [newEvent, setNewEvent] = useState<CreateBetPayload>(
    initialCreateBetState,
  );

  // ✅ CORRIGIDO: Sintaxe correta do useState com Record
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleNewEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      // Garante que bankrollId seja número e os demais sigam como string/value
      [name]: name === "bankrollId" ? Number(value) : value,
    }));

    // Limpa erros de validação ao digitar
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

  const handleFixtureSelect = async (
    previewId: string,
    fixture: DiscoverFixture,
  ) => {
    console.log("🔥 [AddEventModal] handleFixtureSelect CHAMADO!");
    console.log("📦 [AddEventModal] previewId:", previewId);
    console.log("📦 [AddEventModal] fixture:", fixture);

    try {
      // 🔍 TESTE: Chame diretamente aqui para verificar
      console.log(
        "🖼️ [AddEventModal] Logo home ANTES:",
        fixture.teams.home.logo,
      );
      const testeProxy = imageProxyApi.getFullProxyUrl(fixture.teams.home.logo);
      console.log("✅ [AddEventModal] Logo home DEPOIS:", testeProxy);

      setNewEvent((prev) => {
        const updated = {
          ...prev,
          eventDescription: `${fixture.teams.home.name} vs ${fixture.teams.away.name}`,
          apiSportsEventId: fixture.apiSportsEventId?.toString() || null,
          tsdbEventId: fixture.tsdbEventId || null,
          homeTeam: fixture.teams.home.name,
          awayTeam: fixture.teams.away.name,
          homeTeamBadge: fixture.teams.home.logo || null,
          awayTeamBadge: fixture.teams.away.logo || null,
          leagueBadge: fixture.league.logo || null,
          league: fixture.league.name,
          eventDate: fixture.date,
          sport: "Soccer",
        };

        console.log("📊 [AddEventModal] Estado ATUALIZADO:", updated);
        return updated;
      });

      console.log("✅ [AddEventModal] Fixture processado com sucesso");
    } catch (err) {
      console.error("❌ [AddEventModal] Erro ao processar fixture:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedPayload = CreateBetSchema.parse(newEvent);
      const savedBet = await createBet(validatedPayload);

      onAdd?.(savedBet);

      setNewEvent(initialCreateBetState);
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
        console.error("Erro ao criar aposta:", error);
      }
    }
  };

  const handleClose = () => {
    setNewEvent(initialCreateBetState);
    setValidationErrors({});
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
    >
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
          onSelectChange={handleSelectChange}
          onFixtureSelect={handleFixtureSelect}
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
