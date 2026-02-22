import apiClient from "../../apiBaseUrl";
import {
  DatabaseMetrics,
  PerformanceReport,
  RequestMetrics,
  ErrorMetrics,
} from "../schemas/monitoring.schemas";

// ==================== METRICS ====================

export const getAdminMetrics = async () => {
  const response = await apiClient.get<DatabaseMetrics>(
    "/admin/monitoring/metrics",
  );
  return response.data;
};

export const getAdminDatabaseMetrics = async () => {
  const response = await apiClient.get<DatabaseMetrics>(
    "/admin/monitoring/database",
  );
  return response.data;
};

// ==================== PERFORMANCE ====================

export const getAdminPerformance = async (period?: string) => {
  const response = await apiClient.get<PerformanceReport>(
    "/admin/monitoring/performance",
    {
      params: { period },
    },
  );
  return response.data;
};

// ==================== REQUESTS ====================

export const getAdminRequestMetrics = async (limit?: number) => {
  const response = await apiClient.get<RequestMetrics[]>(
    "/admin/monitoring/requests",
    {
      params: { limit },
    },
  );
  return response.data;
};

// ==================== ERRORS ====================

export const getAdminErrorMetrics = async (hours?: number) => {
  const response = await apiClient.get<ErrorMetrics[]>("/admin/system/errors", {
    params: { hours },
  });
  return response.data;
};
