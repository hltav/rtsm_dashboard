import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  AdminQueueName,
  AdminJobStatus,
  AdminQueueJobs,
} from "@/lib/api/admin/schemas/queue.schema";
import {
  formatId,
  statusLabel,
} from "@/modules/admin/schemas/monitoring/queue.schema";

interface JobsTableProps {
  selectedQueue: AdminQueueName;
  selectedStatus: AdminJobStatus;
  limit: number;
  jobs: AdminQueueJobs;
  jobsLoading: boolean;
  actionLoading: {
    retryId?: string;
    removeId?: string;
  };
  onRefresh: () => void;
  onRetry: (jobId: string) => void;
  onRemove: (jobId: string) => void;
}

export const JobsTable: React.FC<JobsTableProps> = ({
  selectedQueue,
  selectedStatus,
  limit,
  jobs,
  jobsLoading,
  actionLoading,
  onRefresh,
  onRetry,
  onRemove,
}) => {
  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 3, border: 1, borderColor: "divider" }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Jobs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedQueue} • {statusLabel[selectedStatus]} • limit {limit}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={
              jobsLoading ? <CircularProgress size={16} /> : <RefreshIcon />
            }
            onClick={onRefresh}
            disabled={jobsLoading}
          >
            Refresh jobs
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {jobsLoading ? (
          <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : jobs.length === 0 ? (
          <Box sx={{ py: 6 }}>
            <Typography color="text.secondary" align="center">
              Nenhum job encontrado para esse filtro.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Attempts</TableCell>
                  <TableCell>Failed reason</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {jobs.map((job) => {
                  const id = formatId(job?.id);
                  const canRetry = selectedStatus === "failed";

                  return (
                    <TableRow key={id}>
                      <TableCell sx={{ fontFamily: "monospace" }}>
                        {id}
                      </TableCell>
                      <TableCell>{job?.name ?? "-"}</TableCell>
                      <TableCell>{job?.attemptsMade ?? "-"}</TableCell>
                      <TableCell sx={{ maxWidth: 420 }}>
                        <Typography
                          variant="body2"
                          noWrap
                          title={job?.failedReason ?? ""}
                        >
                          {job?.failedReason ?? "-"}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Tooltip
                            title={
                              canRetry
                                ? "Retry job"
                                : "Retry só faz sentido em failed"
                            }
                          >
                            <span>
                              <IconButton
                                size="small"
                                onClick={() => onRetry(id)}
                                disabled={
                                  !canRetry || actionLoading.retryId === id
                                }
                              >
                                {actionLoading.retryId === id ? (
                                  <CircularProgress size={18} />
                                ) : (
                                  <ReplayIcon fontSize="small" />
                                )}
                              </IconButton>
                            </span>
                          </Tooltip>

                          <Tooltip title="Remove job">
                            <span>
                              <IconButton
                                size="small"
                                onClick={() => onRemove(id)}
                                disabled={actionLoading.removeId === id}
                              >
                                {actionLoading.removeId === id ? (
                                  <CircularProgress size={18} />
                                ) : (
                                  <DeleteOutlineIcon fontSize="small" />
                                )}
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
