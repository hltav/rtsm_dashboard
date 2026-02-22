"use client";
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { SystemMonitoringHeaderProps } from "@/modules/admin/props/monitoring/systemMonitoring.props";

export default function SystemMonitoringHeader({
  period,
  setPeriod,
  refreshData,
  isRefreshing,
}: SystemMonitoringHeaderProps) {
  return (
    <Box
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        mb: 4,
        gap: 2,
      }}
    >
      {/* Left */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Monitoramento de Sistema
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Admin Dash / Performance & Metrics
        </Typography>
      </Box>

      {/* Right */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Refresh */}
        <IconButton
          onClick={refreshData}
          sx={{
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <RefreshIcon
            sx={{
              animation: isRefreshing ? "spin 1s linear infinite" : "none",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
        </IconButton>

        {/* Period Select */}
        <FormControl size="small">
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            input={<OutlinedInput />}
            sx={{
              borderRadius: 2,
              minWidth: 180,
            }}
          >
            <MenuItem value="1h">Última Hora</MenuItem>
            <MenuItem value="24h">Últimas 24h</MenuItem>
            <MenuItem value="7d">Últimos 7 dias</MenuItem>
            <MenuItem value="30d">Último Mês</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
