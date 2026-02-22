import apiClient from "@/lib/api/apiBaseUrl";
import {
  DatabaseMetrics,
  DatabaseMetricsSchema,
} from "../../schemas/monitoring/databaseMetrics.schema";

export const formatBytesToGB = (bytes?: number) => {
  if (!bytes) return "-";
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
};

export const formatLatency = (latency?: number) =>
  latency ? `${latency} ms` : "-";

export const formatUptime = (isoString: string) => {
  const date = new Date(isoString);
  const diffMs = Date.now() - date.getTime();

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${days}d ${hours}h`;
};

export const getDatabaseMetrics = async (): Promise<DatabaseMetrics> => {
  const response = await apiClient.get("/admin/monitoring/database");

  return DatabaseMetricsSchema.parse(response.data);
};
