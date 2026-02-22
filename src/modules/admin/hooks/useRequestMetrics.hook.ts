import { useEffect, useState } from "react";
import { getRequestMetrics } from "../functions/monitoring/requests.function";
import { RequestMetrics } from "../schemas/monitoring/requestMetrics.schema";

export const useRequestMetrics = (interval = 10000) => {
  const [data, setData] = useState<RequestMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getRequestMetrics();
        setData(result);
      } finally {
        setLoading(false);
      }
    };

    fetch();
    const id = setInterval(fetch, interval);
    return () => clearInterval(id);
  }, [interval]);

  return { data, loading };
};