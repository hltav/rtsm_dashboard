import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import { GetBankrollHistoryDTO } from "@/modules/bankroll/schema/bankrollHistory.schema";

export type BankrollWithHistory = BankrollDto & {
  history: GetBankrollHistoryDTO[];
};
