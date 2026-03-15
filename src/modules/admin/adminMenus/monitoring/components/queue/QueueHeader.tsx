import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Box,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";

interface QueueHeaderProps {
  loading: boolean;
  jobsLoading: boolean;
  onRefresh: () => void;
}

export const QueueHeader: React.FC<QueueHeaderProps> = ({
  loading,
  jobsLoading,
  onRefresh,
}) => {
  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 3, border: 1, borderColor: "divider", mb: 3 }}
    >
      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Filas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitoramento e ações administrativas nas filas.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="outlined"
              startIcon={
                loading ? <CircularProgress size={16} /> : <RefreshIcon />
              }
              onClick={onRefresh}
              disabled={loading || jobsLoading}
              sx={{color: 'text.secondary'}}
            >
              Recarregar
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
