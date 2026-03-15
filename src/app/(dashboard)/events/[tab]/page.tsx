import EventsMainPage from "@/modules/events/EventsMainPage";
import { notFound } from "next/navigation";

const validTabs = ["pending", "finished", "reports", "settings"];

export default async function EventsTabPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;

  if (!validTabs.includes(tab)) {
    notFound();
  }

  return <EventsMainPage />;
}