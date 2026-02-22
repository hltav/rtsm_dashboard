import apiClient from "@/lib/api/apiBaseUrl";
import {
  RequestMetrics,
  RequestMetricsSchema,
} from "../../schemas/monitoring/requestMetrics.schema";

export const getRequestMetrics = async (
  limit?: number,
): Promise<RequestMetrics> => {
  const response = await apiClient.get("/admin/monitoring/requests", {
    params: { limit },
  });
  return RequestMetricsSchema.parse(response.data);
};
