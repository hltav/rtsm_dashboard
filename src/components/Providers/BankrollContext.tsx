"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";
import { BankrollWithHistory } from "@/types/bankrollWithHistory";
import { useAuth } from "./AuthContext";

interface BankrollContextType {
  selectedBankroll: BankrollWithHistory | null;
  setSelectedBankroll: (bankroll: BankrollWithHistory | null) => void;
  selectedBankrollId: number | null;
  bankrolls: BankrollDto[];
  isLoading: boolean;
  error: Error | null;
  selectBankrollById: (id: number) => void;
  clearSelectedBankroll: () => void;
  refetch: () => void;
}

const BankrollContext = createContext<BankrollContextType | undefined>(
  undefined,
);

interface BankrollProviderProps {
  children: React.ReactNode;
}

export const BankrollProvider: React.FC<BankrollProviderProps> = ({
  children,
}) => {
  const [bankrolls, setBankrolls] = useState<BankrollDto[]>([]);
  const [selectedBankroll, setSelectedBankroll] =
    useState<BankrollWithHistory | null>(null);
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState<number>(0);

  const fetchBankrolls = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await bankrollApi.getAll();
      setBankrolls(data);

      if (data.length > 0) {
        const first = data[0];
        const history = await bankrollApi.getHistoryByBankrollId(first.id);

        setSelectedBankroll({
          ...first,
          history,
        });
      }
    } catch (err: unknown) {
      setBankrolls([]);
      setError(
        err instanceof Error ? err : new Error("Erro ao carregar bancas"),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchBankrolls();
  }, [isAuthenticated, fetchBankrolls, shouldRefetch]);

  const refetch = useCallback(() => {
    setShouldRefetch((prev) => prev + 1);
  }, []);

  const selectBankrollById = useCallback(async (id: number) => {
    try {
      setLoading(true);

      const bankroll = await bankrollApi.getById(id);
      const history = await bankrollApi.getHistoryByBankrollId(id);

      const bankrollWithHistory: BankrollWithHistory = {
        ...bankroll,
        history,
      };

      setSelectedBankroll(bankrollWithHistory);
    } catch (err) {
      console.error("Erro ao selecionar banca:", err);
      setError(
        err instanceof Error ? err : new Error("Erro ao selecionar banca"),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSelectedBankroll = useCallback(() => {
    setSelectedBankroll(null);
  }, []);

  const value: BankrollContextType = {
    selectedBankroll,
    setSelectedBankroll,
    selectedBankrollId: selectedBankroll?.id || null,
    bankrolls,
    isLoading: loading,
    error,
    selectBankrollById,
    clearSelectedBankroll,
    refetch,
  };

  return (
    <BankrollContext.Provider value={value}>
      {children}
    </BankrollContext.Provider>
  );
};

export const useBankrollContext = (): BankrollContextType => {
  const context = useContext(BankrollContext);
  if (context === undefined) {
    throw new Error(
      "useBankrollContext must be used within a BankrollProvider",
    );
  }
  return context;
};
