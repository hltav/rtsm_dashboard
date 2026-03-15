import BankrollContainerPage from "@/modules/bankroll/BankrollContainerPage";
import { notFound } from "next/navigation";

const validTabs = [
  "bankroll",
  "details",
  "transactions",
  "reports",
  "settings",
] as const;

export default async function BankrollTabPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;

  if (!validTabs.includes(tab as (typeof validTabs)[number])) {
    notFound();
  }

  return <BankrollContainerPage />;
}