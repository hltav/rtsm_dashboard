import { BankrollDto } from "../schema/bankroll.schema";

export const initialBankrolls: BankrollDto[] = [
  {
    id: "1",
    name: "Banca Principal",
    balance: 1500.75,
    unidValue: 15.0,
    bookmaker: "Bet365",
  },
  {
    id: "2",
    name: "Banca de Teste",
    balance: 250.0,
    unidValue: 2.5,
    bookmaker: "Sportingbet",
  },
  {
    id: "3",
    name: "Banca de Cripto",
    balance: 500.0,
    unidValue: 5.0,
    bookmaker: "Stake",
  },
  {
    id: "4",
    name: "Banca de Futebol",
    balance: 800.5,
    unidValue: 8.0,
    bookmaker: "Betfair",
  },
];
