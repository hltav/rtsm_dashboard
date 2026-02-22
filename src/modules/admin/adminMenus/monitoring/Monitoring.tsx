"use client";
import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import CriticalErrors from "./components/CriticalErrors";
import DashboardFooter from "./components/DashboardFooter";
import DatabaseMetrics from "./components/DbMetrics";
import PerformanceReport from "./components/PerformanceReport";
import RecentRequests from "./components/RecentRequests";
import { useErrorMetrics } from "../../hooks/useErrorMetrics.hook";
import { useDatabaseMetrics } from "../../hooks/useDatabaseMetrics.hook";
import { useRequestMetrics } from "../../hooks/useRequestMetrics.hook";
import MonitorHeader from "./components/MonitorHeader";

const Monitoring = () => {
  const [period, setPeriod] = useState("24h");

  const { metrics, history, loading } = useDatabaseMetrics(50000);

  const { data: requestMetrics } = useRequestMetrics(100000);
  const { data: errorMetrics } = useErrorMetrics(300000);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <MonitorHeader
          period={period}
          setPeriod={setPeriod}
          refreshData={() => window.location.reload()}
          isRefreshing={loading}
        />

        <Box sx={{ mb: 4 }}>
          {metrics && (
            <DatabaseMetrics
              dbMetrics={metrics}
              history={history}
              loading={loading}
            />
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <RecentRequests
              requests={requestMetrics?.slowestRequests ?? []}
              avgDuration={requestMetrics?.avgDuration}
              total={requestMetrics?.total}
            />
          </Grid>

          <Grid item xs={12} lg={4}>
            <CriticalErrors
              errors={errorMetrics?.recentErrors ?? []}
              total={errorMetrics?.total}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <PerformanceReport
            period={period}
            data={{
              throughput: "1.2k",
              latencyP95: 184,
              successRate: 99.98,
            }}
          />
        </Box>

        <DashboardFooter version="2.4.0-stable" />
      </Container>
    </Box>
  );
};

export default Monitoring;
