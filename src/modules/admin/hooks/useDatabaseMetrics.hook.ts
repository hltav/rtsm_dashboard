import { useEffect, useRef, useState, useMemo } from "react";
import { getDatabaseMetrics } from "../functions/monitoring/metrics.function";
import { DatabaseMetrics } from "../schemas/monitoring/databaseMetrics.schema";
import { PerformanceMetrics } from "../schemas/monitoring/performanceMetrics.schema";
import {
  DatabaseMetricsData,
  MetricsHistoryPoint,
} from "../adminMenus/monitoring/components/DbMetrics";
import { getPerformanceMetrics } from "../functions/monitoring/performance.function";
import { useCacheMetrics } from "./useCacheMetrics.hook";

export const useDatabaseMetrics = (interval = 5000) => {
  const [dbData, setDbData] = useState<DatabaseMetrics | undefined>();
  const [perfData, setPerfData] = useState<PerformanceMetrics | undefined>();
  const [history, setHistory] = useState<MetricsHistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: cacheData } = useCacheMetrics(interval);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMetrics = async () => {
    try {
      const [db, perf] = await Promise.all([
        getDatabaseMetrics(),
        getPerformanceMetrics(),
      ]);

      setDbData(db);
      setPerfData(perf);

      if (db.status === "connected") {
        setHistory((prev) => {
          const updated = [
            ...prev,
            {
              time: new Date().toLocaleTimeString(),
              latency: db.latencyMs,
              activeConnections: db.activeConnections,
              cpuUsage: parseFloat(perf.cpu.avg),
            },
          ].slice(-20);

          return updated;
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (isMounted) await fetchMetrics();
    };

    run();
    intervalRef.current = setInterval(run, interval);

    return () => {
      isMounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [interval]);

  const metrics = useMemo((): DatabaseMetricsData | null => {
    if (!dbData || dbData.status === "error" || !perfData) return null;

    return {
      latency: String(dbData.latencyMs),
      activeConnections: dbData.activeConnections,
      cpuUsage: parseFloat(perfData.cpu.avg).toFixed(1),
      storageUsed: `${(dbData.sizeBytes / 1e6).toFixed(2)} MB`,
      uptime: perfData.trend,
      redis: cacheData
        ? {
            status: cacheData.status,
            usedMemoryHuman: cacheData.usedMemoryHuman,
            hitRate: cacheData.hitRate,
            connectedClients: cacheData.connectedClients,
          }
        : null,
    };
  }, [dbData, perfData, cacheData]);

  return { metrics, history, loading };
};
