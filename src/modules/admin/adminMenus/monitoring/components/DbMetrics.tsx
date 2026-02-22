"use client";
import React from "react";
import { Grid } from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Activity, Database, Server } from "lucide-react";
import MonitoringMetricCard from "../../../ui/monitoring/MonitoringMetricCard.ui";

export interface DatabaseMetricsData {
  latency: string;
  activeConnections: number;
  cpuUsage: string;
  storageUsed: string;
  uptime: string;
}

export interface MetricsHistoryPoint {
  time: string;
  latency: number;
}

interface DatabaseMetricsProps {
  dbMetrics: DatabaseMetricsData;
  history: MetricsHistoryPoint[];
  loading: boolean;
}

const DbMetrics: React.FC<DatabaseMetricsProps> = ({ dbMetrics }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <MonitoringMetricCard
          title="Latência do Banco"
          value={`${dbMetrics.latency} ms`}
          icon={<Database color="#42a5f5" />}
          trend="+2.4%"
          trendUp={false}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <MonitoringMetricCard
          title="Conexões Ativas"
          value={dbMetrics.activeConnections}
          icon={<Activity color="#66bb6a" />}
          trend="+12"
          trendUp={true}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <MonitoringMetricCard
          title="Uso de CPU"
          value={`${dbMetrics.cpuUsage}%`}
          icon={<MemoryIcon sx={{ color: "#ab47bc" }} />}
          trend="-0.5%"
          trendUp={false}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <MonitoringMetricCard
          title="Uso de Banco de Dados"
          value={`${dbMetrics.storageUsed}`}
          icon={<Server color="#17ad1a" />}
          trend="+3.5%"
          trendUp={true}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <MonitoringMetricCard
          title="Tempo de Atividade"
          value={dbMetrics.uptime}
          icon={<AccessTimeIcon sx={{ color: "#ffa726" }} />}
        />
      </Grid>
    </Grid>
  );
};

export default DbMetrics;
