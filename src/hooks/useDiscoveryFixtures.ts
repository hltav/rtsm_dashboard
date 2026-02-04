import { browserCache } from "@/lib/cache/browserCache";
import { CLIENT_CACHE_TTL } from "@/lib/cache/cacheTtl";
import {
  DiscoveryFixturesResponse,
  DiscoveryFixturesResponseSchema,
} from "@/lib/cache/schemas/discoveryFixturesResponse.schema";
import { useEffect, useState } from "react";

export function useDiscoveryFixtures() {
  const [data, setData] = useState<DiscoveryFixturesResponse>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = "discovery:fixtures";

    // 🔥 Cache já tipado
    const cached = browserCache.get<DiscoveryFixturesResponse>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    fetch("/api/discovery/fixtures")
      .then((res) => res.json())
      .then((raw) => {
        // 🛡️ Validação Zod
        const parsed = DiscoveryFixturesResponseSchema.parse(raw);

        browserCache.set(cacheKey, parsed, CLIENT_CACHE_TTL.DISCOVERY);

        setData(parsed);
      })
      .catch((err) => {
        console.error("Erro ao carregar fixtures", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
