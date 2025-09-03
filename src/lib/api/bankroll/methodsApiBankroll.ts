import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import { apiBankrollFetch } from "./apiBankrollFetch";

export const createBankroll = async (
  bankrollData: Omit<BankrollDto, "id" | "userId">,
  userId: number,
) => {
  const dataWithUserId = { ...bankrollData, userId };
  return apiBankrollFetch<BankrollDto>({
    endpoint: "/bankrolls",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataWithUserId),
  });
};


export const getBankrolls = async (userId: number) => {
  return apiBankrollFetch<BankrollDto[]>({
    endpoint: `/bankrolls/user/${userId}`,
    method: "GET",
  });
};

export const getBankrollById = async (id: string) => {
  return apiBankrollFetch<BankrollDto>({
    endpoint: `/bankrolls/${id}`,
    method: "GET",
  });
};

export const updateBankroll = async (
  id: string,
  bankrollData: Omit<BankrollDto, "id" | "userId">
) => {
  return apiBankrollFetch<BankrollDto>({
    endpoint: `/bankrolls/${id}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bankrollData),
  });
};

export const patchBankroll = async (
  id: string,
  bankrollData: Partial<Omit<BankrollDto, "id" | "userId">>
) => {
  return apiBankrollFetch<BankrollDto>({
    endpoint: `/bankrolls/${id}`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bankrollData),
  });
};

export const deleteBankroll = async (id: string) => {
  return apiBankrollFetch<{ message: string }>({
    endpoint: `/bankrolls/${id}`,
    method: "DELETE",
  });
};
