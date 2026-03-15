import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  AdminQueueName,
  AdminJobStatus,
} from "@/lib/api/admin/schemas/queue.schema";
import {
  LIMIT_OPTIONS,
  queueLabel,
  QUEUES,
  STATUSES,
  statusLabel,
} from "@/modules/admin/schemas/monitoring/queue.schema";

interface QueueFiltersProps {
  selectedQueue: AdminQueueName;
  selectedStatus: AdminJobStatus;
  limit: number;
  pauseResumeLoading?: boolean;
  onQueueChange: (queue: AdminQueueName) => void;
  onStatusChange: (status: AdminJobStatus) => void;
  onLimitChange: (limit: number) => void;
  onPause: () => void;
  onResume: () => void;
}

export const QueueFilters: React.FC<QueueFiltersProps> = ({
  selectedQueue,
  selectedStatus,
  limit,
  pauseResumeLoading,
  onQueueChange,
  onStatusChange,
  onLimitChange,
  onPause,
  onResume,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Queue</InputLabel>
            <Select
              label="Queue"
              value={selectedQueue}
              onChange={(e) => onQueueChange(e.target.value as AdminQueueName)}
            >
              {QUEUES.map((q) => (
                <MenuItem key={q} value={q}>
                  {queueLabel[q]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value as AdminJobStatus)}
            >
              {STATUSES.map((s) => (
                <MenuItem key={s} value={s}>
                  {statusLabel[s]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Limit</InputLabel>
            <Select
              label="Limit"
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
            >
              {LIMIT_OPTIONS.map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 2 }}
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          startIcon={<PauseIcon />}
          onClick={onPause}
          disabled={pauseResumeLoading}
          sx={{color: 'text.secondary'}}
        >
          Pausa
        </Button>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={onResume}
          disabled={pauseResumeLoading}
        >
          Resumo
        </Button>
      </Stack>
    </>
  );
};
