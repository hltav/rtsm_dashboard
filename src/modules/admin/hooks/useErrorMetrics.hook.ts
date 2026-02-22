import { useEffect, useState } from "react";
import { getErrorMetrics } from "../functions/monitoring/errors.function";
import { ErrorMetrics } from "../schemas/monitoring/errorMetrics.schema";

export const useErrorMetrics = (interval = 30000) => {
  const [data, setData] = useState<ErrorMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getErrorMetrics();
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
