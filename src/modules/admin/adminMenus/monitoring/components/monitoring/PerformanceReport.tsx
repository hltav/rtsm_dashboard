"use client";
import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { PerformanceReportProps } from "../../../../props/monitoring/errors.props";

const PerformanceReport: React.FC<PerformanceReportProps> = ({
  period,
  data,
  onExport,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Relatório de Performance
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Visão consolidada do período: {period}
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={onExport}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1,
              boxShadow: 3,
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            Exportar PDF
          </Button>
        </Box>

        {/* Metrics Grid */}
        <Grid container spacing={4}>
          {/* Throughput */}
          <Grid item xs={12} md={4}>
            <Box textAlign={{ xs: "center", md: "left" }}>
              <Typography
                variant="caption"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontWeight: 700,
                  color: "text.secondary",
                }}
              >
                Throughput
              </Typography>

              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                {data.throughput}{" "}
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ opacity: 0.6, fontWeight: 400 }}
                >
                  req/s
                </Typography>
              </Typography>
            </Box>
          </Grid>

          {/* Latency */}
          <Grid item xs={12} md={4}>
            <Box textAlign={{ xs: "center", md: "left" }}>
              <Typography
                variant="caption"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontWeight: 700,
                  color: "text.secondary",
                }}
              >
                P95 Latency
              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ mt: 1, color: "warning.main" }}
              >
                {data.latencyP95}{" "}
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ opacity: 0.6, fontWeight: 400 }}
                >
                  ms
                </Typography>
              </Typography>
            </Box>
          </Grid>

          {/* Success Rate */}
          <Grid item xs={12} md={4}>
            <Box textAlign={{ xs: "center", md: "left" }}>
              <Typography
                variant="caption"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontWeight: 700,
                  color: "text.secondary",
                }}
              >
                Taxa de Sucesso
              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ mt: 1, color: "success.main" }}
              >
                {data.successRate}
                <Typography
                  component="span"
                  variant="h6"
                  sx={{ opacity: 0.6, fontWeight: 400 }}
                >
                  %
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PerformanceReport;
