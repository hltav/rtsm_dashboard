// import { useState } from "react";
// import { BankrollDto } from "../schema/bankroll.schema";
// import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";
// import { useNotification } from "@/components/Providers/NotificationSnackbar";

// interface EditBankrollData {
//   id: number;
//   balance: number;
//   unidValue: number;
//   editBalance: "" | "addedBalance" | "withdrawals";
//   addedBalance: number;
//   withdrawals: number;
// }

// export const useEditBankroll = (onClose: () => void) => {
//   const [loading, setLoading] = useState(false);
//   const { showNotification } = useNotification();

//   const saveBankrollChanges = async (bankrollItemModal: EditBankrollData) => {
//     setLoading(true);

//     const bankrollId = bankrollItemModal.id;
//     const updatePayload: Partial<Omit<BankrollDto, "id" | "userId">> = {};

//     const currentBalance = bankrollItemModal.balance;

//     let newBalance = currentBalance;
//     let shouldUpdateBalance = false;

//     if (
//       bankrollItemModal.editBalance === "addedBalance" &&
//       bankrollItemModal.addedBalance
//     ) {
//       const addedAmount = bankrollItemModal.addedBalance;

//       newBalance = currentBalance + addedAmount;
//       shouldUpdateBalance = true;
//     } else if (
//       bankrollItemModal.editBalance === "withdrawals" &&
//       bankrollItemModal.withdrawals
//     ) {
//       const withdrawalAmount = bankrollItemModal.withdrawals;

//       if (currentBalance < withdrawalAmount) {
//         showNotification("Valor a retirar excede o saldo.", "error", 3000);
//         setLoading(false);
//         return;
//       }

//       newBalance = currentBalance - withdrawalAmount;
//       shouldUpdateBalance = true;
//     }

//     const newUnidValue = bankrollItemModal.unidValue;
//     updatePayload.unidValue = newUnidValue;

//     if (shouldUpdateBalance) {
//       updatePayload.balance = newBalance;
//     }

//     try {
//       await bankrollApi.patch(bankrollId, updatePayload);
//       showNotification("Banca atualizada com sucesso!", "success", 2000);
//       onClose();
//     } catch (error) {
//       console.error("Erro ao atualizar banca:", error);
//       showNotification(
//         "Erro ao atualizar a banca. Tente novamente.",
//         "error",
//         3000
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { saveBankrollChanges, loading };
// };

import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  return useMutation({
    mutationFn: async (bankrollItemModal: EditBankrollData) => {
      const bankrollId = bankrollItemModal.id;
      const updatePayload: Partial<Omit<BankrollDto, "id" | "userId">> = {};
      const currentBalance = bankrollItemModal.balance;

      let newBalance = currentBalance;
      let shouldUpdateBalance = false;

      // Lógica de cálculo de saldo
      if (
        bankrollItemModal.editBalance === "addedBalance" &&
        bankrollItemModal.addedBalance
      ) {
        newBalance = currentBalance + bankrollItemModal.addedBalance;
        shouldUpdateBalance = true;
      } else if (
        bankrollItemModal.editBalance === "withdrawals" &&
        bankrollItemModal.withdrawals
      ) {
        if (currentBalance < bankrollItemModal.withdrawals) {
          throw new Error("Saldo insuficiente");
        }
        newBalance = currentBalance - bankrollItemModal.withdrawals;
        shouldUpdateBalance = true;
      }

      updatePayload.unidValue = bankrollItemModal.unidValue;
      if (shouldUpdateBalance) {
        updatePayload.balance = newBalance;
      }

      return bankrollApi.patch(bankrollId, updatePayload);
    },
    onSuccess: () => {
      // O SEGREDO: Isso avisa o Dashboard que o saldo mudou!
      queryClient.invalidateQueries({ queryKey: ["bankrolls"] });

      showNotification("Banca atualizada com sucesso!", "success", 2000);
      onClose();
    },
    onError: (error) => {
      const message =
        error.message === "Saldo insuficiente"
          ? error.message
          : "Erro ao atualizar a banca.";
      showNotification(message, "error", 3000);
    },
  });
};
