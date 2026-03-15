import {
  AdminQueueName,
  AdminJobStatus,
} from "@/lib/api/admin/schemas/queue.schema";

export const QUEUES: AdminQueueName[] = [
  "frequent",
  "linking",
  "heavy",
  "sync",
];

export const STATUSES: AdminJobStatus[] = [
  "waiting",
  "active",
  "failed",
  "completed",
];

export const LIMIT_OPTIONS = [10, 20, 50, 100];

export const queueLabel: Record<AdminQueueName, string> = {
  frequent: "Frequentes",
  linking: "Vinculação",
  heavy: "Processamento Intensivo",
  sync: "Sincronização",
};

export const statusLabel: Record<AdminJobStatus, string> = {
  waiting: "Aguardando",
  active: "Processando",
  failed: "Falhou",
  completed: "Concluído",
};

export const formatId = (id: unknown) => {
  if (typeof id === "string") return id;
  if (typeof id === "number") return String(id);
  return "-";
};
