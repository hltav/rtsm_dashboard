import React from "react";
import { Card, CardContent, Typography, Stack, Chip } from "@mui/material";
import {
  AdminQueueName,
  AdminJobStatus,
} from "@/lib/api/admin/schemas/queue.schema";
import { queueLabel, statusLabel } from "@/modules/admin/schemas/monitoring/queue.schema";

interface QueueSummaryProps {
  selectedQueue: AdminQueueName;
  selectedStatus: AdminJobStatus;
  jobsCount: number;
  counts?: {
    waiting?: number;
    active?: number;
    failed?: number;
    completed?: number;
  } | null;
}

export const QueueSummary: React.FC<QueueSummaryProps> = ({
  selectedQueue,
  selectedStatus,
  jobsCount,
  counts,
}) => {
  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 3, border: 1, borderColor: "divider" }}
    >
      <CardContent>
        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          Selecione uma fila e status para visualizar os trabalhos
          correspondentes.
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            label={`Fila: ${queueLabel[selectedQueue]}`}
            sx={{ cursor: "pointer", backgroundColor: "background.default" }}
          />
          <Chip
            label={`Status: ${statusLabel[selectedStatus]}`}
            sx={{ cursor: "pointer", backgroundColor: "background.default" }}
          />
          <Chip
            label={`Carregados: ${jobsCount}`}
            sx={{ cursor: "pointer", backgroundColor: "background.default" }}
          />
          <Chip
            label={`Aguardando: ${counts?.waiting ?? "-"}`}
            sx={{ cursor: "pointer", backgroundColor: "background.default" }}
          />
          <Chip
            label={`Ativos: ${counts?.active ?? "-"}`}
            sx={{ cursor: "pointer", backgroundColor: "background.default" }}
          />
          <Chip
            label={`Falhos: ${counts?.failed ?? "-"}`}
            sx={{ cursor: "pointer", backgroundColor: "background.default" }}
          />
          <Chip
            label={`Concluídos: ${counts?.completed ?? "-"}`}
            sx={{ cursor: "pointer", backgroundColor: "background.default" }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
