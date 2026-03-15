/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, Container } from "@mui/material";
import DashboardFooter from "./components/DashboardFooter";
import {
  getAdminQueueOverview,
  getAdminQueueJobs,
  pauseAdminQueue,
  resumeAdminQueue,
  retryAdminQueueJob,
  removeAdminQueueJob,
} from "@/lib/api/admin/monitoring/queueApi";
import {
  AdminQueueName,
  AdminJobStatus,
  AdminQueueOverview,
  AdminQueueJobs,
} from "@/lib/api/admin/schemas/queue.schema";
import { JobsTable } from "./components/queue/JobsTable";
import { QueueFilters } from "./components/queue/QueueFilters";
import { QueueHeader } from "./components/queue/QueueHeader";
import { QueueOverviewCards } from "./components/queue/QueueOverviewCards";
import { QueueSummary } from "./components/queue/QueueSummary";

const Queue = () => {
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState<AdminQueueOverview | null>(null);
  const [selectedQueue, setSelectedQueue] =
    useState<AdminQueueName>("frequent");
  const [selectedStatus, setSelectedStatus] =
    useState<AdminJobStatus>("waiting");
  const [limit, setLimit] = useState<number>(20);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobs, setJobs] = useState<AdminQueueJobs>([]);
  const [actionLoading, setActionLoading] = useState<{
    pauseResume?: boolean;
    retryId?: string;
    removeId?: string;
  }>({});

  const refreshAll = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminQueueOverview();
      setOverview(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      const data = await getAdminQueueJobs({
        queue: selectedQueue,
        status: selectedStatus,
        limit,
      });
      setJobs(data);
    } finally {
      setJobsLoading(false);
    }
  }, [selectedQueue, selectedStatus, limit]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    refreshJobs();
  }, [refreshJobs]);

  const selectedCounts = useMemo(() => {
    if (!overview) return null;
    return overview[selectedQueue];
  }, [overview, selectedQueue]);

  const handleRefresh = useCallback(() => {
    refreshAll();
    refreshJobs();
  }, [refreshAll, refreshJobs]);

  const handlePause = useCallback(async () => {
    setActionLoading((s) => ({ ...s, pauseResume: true }));
    try {
      await pauseAdminQueue(selectedQueue);
    } finally {
      setActionLoading((s) => ({ ...s, pauseResume: false }));
    }
  }, [selectedQueue]);

  const handleResume = useCallback(async () => {
    setActionLoading((s) => ({ ...s, pauseResume: true }));
    try {
      await resumeAdminQueue(selectedQueue);
    } finally {
      setActionLoading((s) => ({ ...s, pauseResume: false }));
    }
  }, [selectedQueue]);

  const handleRetry = useCallback(
    async (jobId: string) => {
      setActionLoading((s) => ({ ...s, retryId: jobId }));
      try {
        await retryAdminQueueJob({ queue: selectedQueue, jobId });
        await refreshJobs();
        await refreshAll();
      } finally {
        setActionLoading((s) => ({ ...s, retryId: undefined }));
      }
    },
    [selectedQueue, refreshJobs, refreshAll],
  );

  const handleRemove = useCallback(
    async (jobId: string) => {
      setActionLoading((s) => ({ ...s, removeId: jobId }));
      try {
        await removeAdminQueueJob({ queue: selectedQueue, jobId });
        await refreshJobs();
        await refreshAll();
      } finally {
        setActionLoading((s) => ({ ...s, removeId: undefined }));
      }
    },
    [selectedQueue, refreshJobs, refreshAll],
  );

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", py: 4 }}>
      <Container >
        <QueueHeader
          loading={loading}
          jobsLoading={jobsLoading}
          onRefresh={handleRefresh}
        />

        <Card
          elevation={0}
          sx={{ borderRadius: 3, border: 1, borderColor: "divider", mb: 3 }}
        >
          <CardContent>
            <QueueFilters
              selectedQueue={selectedQueue}
              selectedStatus={selectedStatus}
              limit={limit}
              pauseResumeLoading={actionLoading.pauseResume}
              onQueueChange={setSelectedQueue}
              onStatusChange={setSelectedStatus}
              onLimitChange={setLimit}
              onPause={handlePause}
              onResume={handleResume}
            />
          </CardContent>
        </Card>

        <QueueOverviewCards
          overview={overview}
          selectedQueue={selectedQueue}
          loading={loading}
          onQueueSelect={setSelectedQueue}
        />

        {/* <JobsTable
          selectedQueue={selectedQueue}
          selectedStatus={selectedStatus}
          limit={limit}
          jobs={jobs}
          jobsLoading={jobsLoading}
          actionLoading={actionLoading}
          onRefresh={refreshJobs}
          onRetry={handleRetry}
          onRemove={handleRemove}
        /> */}

        <Box sx={{ mt: 3 }}>
          <QueueSummary
            selectedQueue={selectedQueue}
            selectedStatus={selectedStatus}
            jobsCount={jobs.length}
            counts={selectedCounts}
          />
        </Box>

        <DashboardFooter version="2.4.0-stable" />
      </Container>
    </Box>
  );
};

export default Queue;
