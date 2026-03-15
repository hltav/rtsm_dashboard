import DashboardPageContent from "@/modules/dashboard/DashboardPageContent";
import { notFound } from "next/navigation";

const validTabsByPage = {
  main: ["overview", "other_data"],
} as const;

type DashboardPage = keyof typeof validTabsByPage;

const isDashboardPage = (value: string): value is DashboardPage => {
  return value in validTabsByPage;
};

export default async function DashboardDynamicPage({
  params,
}: {
  params: Promise<{ page: string; tab: string }>;
}) {
  const { page, tab } = await params;

  if (!isDashboardPage(page)) {
    notFound();
  }

  const validTabs = validTabsByPage[page] as readonly string[];

  if (!validTabs.includes(tab)) {
    notFound();
  }

  return <DashboardPageContent />;
}
