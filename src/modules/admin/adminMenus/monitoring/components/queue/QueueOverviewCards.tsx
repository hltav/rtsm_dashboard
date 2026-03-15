import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  AdminQueueName,
  AdminQueueOverview,
} from "@/lib/api/admin/schemas/queue.schema";
import { queueLabel, QUEUES } from "@/modules/admin/schemas/monitoring/queue.schema";

interface QueueOverviewCardsProps {
  overview: AdminQueueOverview | null;
  selectedQueue: AdminQueueName;
  loading: boolean;
  onQueueSelect: (queue: AdminQueueName) => void;
}

export const QueueOverviewCards: React.FC<QueueOverviewCardsProps> = ({
  overview,
  selectedQueue,
  loading,
  onQueueSelect,
}) => {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {QUEUES.map((q) => {
        const counts = overview?.[q];
        const isSelected = q === selectedQueue;

        return (
          <Grid key={q} item xs={12} sm={6} lg={3}>
            <Card
              elevation={0}
              onClick={() => onQueueSelect(q)}
              sx={{
                borderRadius: 3,
                border: 1,
                borderColor: isSelected ? "primary.main" : "divider",
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.01)" },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ fontWeight: 700 }}>{queueLabel[q]}</Typography>
                  {loading && !overview ? <CircularProgress size={16} /> : null}
                </Stack>

                <Stack
                  direction="column"
                  spacing={1}
                  sx={{ mt: 2, flexWrap: "wrap" }}
                >
                  <Chip
                    size="small"
                    label={`Aguardando: ${counts?.waiting ?? ""}`}
                    sx={{ justifyContent: "flex-start", backgroundColor: "background.default" }}
                  />
                  <Chip
                    size="small"
                    label={`Ativos: ${counts?.active ?? ""}`}
                    sx={{ justifyContent: "flex-start", backgroundColor: "background.default" }}
                  />
                  <Chip
                    size="small"
                    label={`Falhos: ${counts?.failed ?? ""}`}
                    sx={{ justifyContent: "flex-start", backgroundColor: "background.default" }}
                  />
                  <Chip
                    size="small"
                    label={`Concluídos: ${counts?.completed ?? ""}`}
                    sx={{ justifyContent: "flex-start", backgroundColor: "background.default" }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
