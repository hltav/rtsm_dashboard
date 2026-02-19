import { Result } from "../schemas/Result.schema";

export const getChipColor: Record<Result, string> = {
  win: "#17ad1a",
  lose: "#e42a2a",
  pending: "#E0A800",
  draw: "#007bff",
  cashout: "#6c175a",
  returned: "#6c757d",
  void: "#6c757d",
  half_win: "#17ad1a",
  half_lose: "#e42a2a",
};

export const resultConfig: Record<Result, { color: string; label: string }> = {
  win: {
    color: "#17ad1a",
    label: "Ganha",
  },
  lose: {
    color: "#e42a2a",
    label: "Perdida",
  },
  pending: {
    color: "#E0A800",
    label: "Pendente",
  },
  draw: {
    color: "#007bff",
    label: "Empate",
  },
  cashout: {
    color: "#6c175a",
    label: "Cashout",
  },
  returned: {
    color: "#6c757d",
    label: "Devolvida",
  },
  void: {
    color: "#6c757d",
    label: "Anulada",
  },
  half_win: {
    color: "#17ad1a",
    label: "Meio Ganha",
  },
  half_lose: {
    color: "#e42a2a",
    label: "Meia Perda",
  },
};
