import { useEffect, useRef, useState } from "react";
import { CacheMetrics } from "../schemas/monitoring/cacheMetrics.schema";
import { getAdminCacheMetrics } from "@/lib/api/admin/monitoring/monitoringApi";

export const useCacheMetrics = (interval = 5000) => {
  const [data, setData] = useState<CacheMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!isMounted) return;
      try {
        const result = await getAdminCacheMetrics();
        setData(result);
      } finally {
        setLoading(false);
      }
    };

    run();
    intervalRef.current = setInterval(run, interval);

    return () => {
      isMounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [interval]);

  return { data, loading };
};
