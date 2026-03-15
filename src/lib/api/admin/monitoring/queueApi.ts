import apiClient from "../../apiBaseUrl";
import {
  AdminQueueOverview,
  adminQueueOverviewSchema,
  AdminQueueName,
  AdminJobStatus,
  AdminQueueJobs,
  adminQueueJobsSchema,
} from "../schemas/queue.schema";

// ==================== QUEUES ====================

// 📊 Overview (cards)
export const getAdminQueueOverview = async (): Promise<AdminQueueOverview> => {
  const response = await apiClient.get("/admin/queues/overview");
  return adminQueueOverviewSchema.parse(response.data);
};

// 📋 Listagem de jobs
export const getAdminQueueJobs = async (params: {
  queue: AdminQueueName;
  status: AdminJobStatus;
  limit?: number;
}): Promise<AdminQueueJobs> => {
  const { queue, status, limit } = params;

  const response = await apiClient.get(`/admin/queues/${queue}/jobs`, {
    params: { status, limit },
  });

  return adminQueueJobsSchema.parse(response.data);
};

// 🔁 Retry job
export const retryAdminQueueJob = async (params: {
  queue: AdminQueueName;
  jobId: string;
}) => {
  const { queue, jobId } = params;
  const response = await apiClient.post(
    `/admin/queues/${queue}/jobs/${jobId}/retry`,
  );
  return response.data;
};

// 🗑 Remove job
export const removeAdminQueueJob = async (params: {
  queue: AdminQueueName;
  jobId: string;
}) => {
  const { queue, jobId } = params;
  const response = await apiClient.delete(
    `/admin/queues/${queue}/jobs/${jobId}`,
  );
  return response.data;
};

// ⏸ Pausar fila
export const pauseAdminQueue = async (queue: AdminQueueName) => {
  const response = await apiClient.post(`/admin/queues/${queue}/pause`);
  return response.data;
};

// ▶ Retomar fila
export const resumeAdminQueue = async (queue: AdminQueueName) => {
  const response = await apiClient.post(`/admin/queues/${queue}/resume`);
  return response.data;
};
