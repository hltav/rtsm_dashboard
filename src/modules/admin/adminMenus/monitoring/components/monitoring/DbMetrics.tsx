"use client";
import React from "react";
import { Grid } from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Activity, Database, DatabaseZap, Server } from "lucide-react";
import MonitoringMetricCard from "../../../../ui/monitoring/MonitoringMetricCard.ui";

export interface DatabaseMetricsData {
  latency: string;
  activeConnections: number;
  cpuUsage: string;
  storageUsed: string;
  uptime: string;
  redis: {
    status: "connected" | "error";
    usedMemoryHuman: string;
    hitRate: number;
    connectedClients: number;
  } | null;
}

export interface MetricsHistoryPoint {
  time: string;
  latency: number;
  activeConnections: number;
  cpuUsage: number;
}

interface DatabaseMetricsProps {
  dbMetrics: DatabaseMetricsData;
  history: MetricsHistoryPoint[];
  loading: boolean;
}

const DbMetrics: React.FC<DatabaseMetricsProps> = ({ dbMetrics, history }) => {
  const calculateTrend = (previous: number, current: number) => {
    if (!previous) return { value: "N/A", up: false };
    const diff = ((current - previous) / previous) * 100;
    return {
      value: `${diff > 0 ? "+" : ""}${diff.toFixed(1)} %`,
      up: diff > 0,
    };
  };

  const prev = history[history.length - 2];
  const curr = history[history.length - 1];

  const latencyTrend = calculateTrend(
    prev?.latency,
    curr?.latency ?? parseFloat(dbMetrics.latency),
  );
  const connectionsTrend = calculateTrend(
    prev?.activeConnections,
    curr?.activeConnections ?? dbMetrics.activeConnections,
  );
  const cpuTrend = calculateTrend(
    prev?.cpuUsage,
    curr?.cpuUsage ?? parseFloat(dbMetrics.cpuUsage),
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={2}>
        <MonitoringMetricCard
          title="Latência do Banco"
          value={`${dbMetrics.latency} ms`}
          icon={<Database color="#42a5f5" />}
          trend={latencyTrend.value}
          trendUp={latencyTrend.up}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <MonitoringMetricCard
          title="Conexões Ativas"
          value={dbMetrics.activeConnections}
          icon={<Activity color="#17ad1a" />}
          trend={connectionsTrend.value}
          trendUp={connectionsTrend.up}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <MonitoringMetricCard
          title="Uso de CPU"
          value={`${dbMetrics.cpuUsage} %`}
          icon={<MemoryIcon sx={{ color: "#ab47bc" }} />}
          trend={cpuTrend.value}
          trendUp={cpuTrend.up}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <MonitoringMetricCard
          title="Uso de Banco de Dados"
          value={dbMetrics.storageUsed}
          icon={<Server color="#17ad1a" />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <MonitoringMetricCard
          title="Tempo de Atividade"
          value={dbMetrics.uptime}
          icon={<AccessTimeIcon sx={{ color: "#ffa726" }} />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <MonitoringMetricCard
          title="Client Redis"
          value={
            dbMetrics.redis?.status === "connected"
              ? dbMetrics.redis.usedMemoryHuman
              : "Desconectado"
          }
          icon={
            <DatabaseZap
              color={
                dbMetrics.redis?.status === "connected" ?  "#17ad1a" : "#d31717"
              }
            />
          }
          trend={
            dbMetrics.redis
              ? `${dbMetrics.redis.hitRate.toFixed(1)} % hit`
              : "N/A"
          }
          trendUp={dbMetrics.redis ? dbMetrics.redis.hitRate > 80 : false}
        />
      </Grid>
    </Grid>
  );
};

export default DbMetrics;
