"use client";

import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  useTheme,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CriticalErrorsProps } from "../../../props/monitoring/errors.props";

const CriticalErrors: React.FC<CriticalErrorsProps> = ({
  errors,
  onOpenLogs,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <ErrorOutlineIcon color="error" />
          <Typography variant="h6" fontWeight="600">
            Erros Críticos
          </Typography>
        </Box>

        {/* Error List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {errors.map((error) => (
            <Box
              key={error.id}
              sx={{
                p: 2,
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette.error.main}`,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.03)",
              }}
            >
              {/* Top Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 1,
                    color: "error.main",
                  }}
                >
                  {error.code}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {error.time}
                </Typography>
              </Box>

              {/* Message */}
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                {error.message}
              </Typography>

              {/* Badge */}
              <Chip
                label="CRÍTICO"
                size="small"
                color="error"
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
            </Box>
          ))}

          {/* Open Logs Button */}
          <Button
            variant="outlined"
            onClick={onOpenLogs}
            sx={{
              mt: 1,
              borderStyle: "dashed",
              textTransform: "none",
            }}
          >
            Abrir Log de Erros Completo
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CriticalErrors;
