import { returnCurrency } from "@/utils/formatCurrency";

export const calculateNetProfit = (
  actualReturn: string | number | null | undefined,
  unitValue: string | number | null | undefined,
  stake: string | number | null | undefined
): string => {
  // Converte tudo para número, usando 0 como padrão se for nulo/vazio
  const valReturn = Number(actualReturn) || 0;
  const valUnit = Number(unitValue) || 0;
  const valStake = Number(stake) || 0;

  // Se o retorno for 0, aposta ainda pode estar pendente ou perdida
  if (valReturn === 0) return returnCurrency(0);

  const netProfit = valReturn - (valUnit * valStake);
  
  return returnCurrency(netProfit);
};