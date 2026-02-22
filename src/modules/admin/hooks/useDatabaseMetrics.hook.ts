// import { useEffect, useRef, useState } from "react";
// import { getDatabaseMetrics } from "../functions/monitoring/metrics.function";
// import { DatabaseMetrics } from "../schemas/monitoring/databaseMetrics.schema";
// import { MetricsHistoryPoint } from "../adminMenus/monitoring/components/DatabaseMetrics";

// export const useDatabaseMetrics = (interval = 5000) => {
//   const [data, setData] = useState<DatabaseMetrics | undefined>();
//   const [history, setHistory] = useState<MetricsHistoryPoint[]>([]);
//   const [loading, setLoading] = useState(true);

//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const fetchMetrics = async () => {
//     try {
//       const metrics = await getDatabaseMetrics();

//       setData(metrics);

//       if (metrics.status === "connected") {
//         setHistory((prev) => {
//           const updated = [
//             ...prev,
//             {
//               time: new Date().toLocaleTimeString(),
//               latency: metrics.latencyMs,
//             },
//           ];

//           return updated.slice(-20);
//         });
//       }

//       setLoading(false);
//     } catch {
//       setLoading(false);
//     }
//   };

//   // 🔥 Effect robusto
//   useEffect(() => {
//     let isMounted = true;

//     const run = async () => {
//       if (!isMounted) return;
//       await fetchMetrics();
//     };

//     run();

//     intervalRef.current = setInterval(run, interval);

//     return () => {
//       isMounted = false;

//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [interval]);

//   return { data, history, loading };
// };

import { useEffect, useRef, useState, useMemo } from "react";
import { getDatabaseMetrics } from "../functions/monitoring/metrics.function";
import { DatabaseMetrics } from "../schemas/monitoring/databaseMetrics.schema";
import { PerformanceMetrics } from "../schemas/monitoring/performanceMetrics.schema";
import {
  DatabaseMetricsData,
  MetricsHistoryPoint,
} from "../adminMenus/monitoring/components/DbMetrics";
import { getPerformanceMetrics } from "../functions/monitoring/performance.function";

export const useDatabaseMetrics = (interval = 5000) => {
  const [dbData, setDbData] = useState<DatabaseMetrics | undefined>();
  const [perfData, setPerfData] = useState<PerformanceMetrics | undefined>();
  const [history, setHistory] = useState<MetricsHistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);

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
        setHistory((prev) =>
          [
            ...prev,
            { time: new Date().toLocaleTimeString(), latency: db.latencyMs },
          ].slice(-20),
        );
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
    };
  }, [dbData, perfData]);

  return { metrics, history, loading };
};
