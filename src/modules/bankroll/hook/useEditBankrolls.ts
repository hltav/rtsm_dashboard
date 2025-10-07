import { useState } from "react";
import { BankrollDto } from "../schema/bankroll.schema";
import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";
import { useNotification } from "@/components/Providers/NotificationSnackbar";

interface EditBankrollData {
  id: number;
  balance: number;
  unidValue: number;
  editBalance: "" | "addedBalance" | "withdrawals";
  addedBalance: number;
  withdrawals: number;
}

export const useEditBankroll = (onClose: () => void) => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const saveBankrollChanges = async (bankrollItemModal: EditBankrollData) => {
    setLoading(true);

    const bankrollId = bankrollItemModal.id.toString();
    const updatePayload: Partial<Omit<BankrollDto, "id" | "userId">> = {};

    // Já é number, não precisa converter
    const currentBalance = bankrollItemModal.balance;

    let newBalance = currentBalance;
    let shouldUpdateBalance = false;

    // DEBUG: Verifique os valores
    console.log("Saldo atual:", currentBalance);
    console.log("Tipo de edição:", bankrollItemModal.editBalance);
    console.log("Valor a adicionar:", bankrollItemModal.addedBalance);
    console.log("Valor a retirar:", bankrollItemModal.withdrawals);

    if (
      bankrollItemModal.editBalance === "addedBalance" &&
      bankrollItemModal.addedBalance
    ) {
      // Já é number, não precisa converter
      const addedAmount = bankrollItemModal.addedBalance;
      console.log("Valor adicionado:", addedAmount);

      newBalance = currentBalance + addedAmount;
      shouldUpdateBalance = true;
    } else if (
      bankrollItemModal.editBalance === "withdrawals" &&
      bankrollItemModal.withdrawals
    ) {
      // Já é number, não precisa converter
      const withdrawalAmount = bankrollItemModal.withdrawals;
      console.log("Valor retirado:", withdrawalAmount);

      if (currentBalance < withdrawalAmount) {
        showNotification("Valor a retirar excede o saldo.", "error", 3000);
        setLoading(false);
        return;
      }

      newBalance = currentBalance - withdrawalAmount;
      shouldUpdateBalance = true;
    }

    // Atualiza o valor da UNID (já é number)
    const newUnidValue = bankrollItemModal.unidValue;
    updatePayload.unidValue = newUnidValue;

    // Atualiza o saldo se necessário
    if (shouldUpdateBalance) {
      updatePayload.balance = newBalance;
    }

    // DEBUG: Verifique o payload final
    console.log("Payload a ser enviado:", updatePayload);
    console.log("Novo saldo:", newBalance);

    try {
      await bankrollApi.patch(bankrollId, updatePayload);
      showNotification("Banca atualizada com sucesso!", "success", 2000);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar banca:", error);
      showNotification(
        "Erro ao atualizar a banca. Tente novamente.",
        "error",
        3000
      );
    } finally {
      setLoading(false);
    }
  };

  return { saveBankrollChanges, loading };
};
