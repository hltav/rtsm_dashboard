import {
  GetBankrollHistoryDTO,
  HistoryType,
} from "@/modules/bankroll/schema/bankrollHistory.schema";
import { useMemo } from "react";

const balanceAffectingTypes: HistoryType[] = [
  "DEPOSIT",
  "WITHDRAWAL",
  "BET_WON",
  "BET_LOST",
  "BET_VOID",
  "BALANCE_ADJUSTMENT",
];

export function useFilteredBankrollHistory(
  history: GetBankrollHistoryDTO[] | undefined,
  filterMode: "all" | "daily"
) {
  return useMemo(() => {
    if (!history) return [];

    const isHistoryType = (t: string | null | undefined): t is HistoryType =>
      typeof t === "string" && balanceAffectingTypes.includes(t as HistoryType);

    const meaningful = history.filter((h) => isHistoryType(h.type));

    const sorted = [...meaningful].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    if (filterMode === "daily") {
      return Array.from(
        sorted.reduce((map, item) => {
          const dateKey = new Date(item.date).toISOString().split("T")[0];
          const existing = map.get(dateKey);
          if (!existing || new Date(item.date) > new Date(existing.date)) {
            map.set(dateKey, item);
          }
          return map;
        }, new Map<string, (typeof sorted)[0]>())
      )
        .map(([, item]) => item)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }

    return sorted;
  }, [history, filterMode]);
}
