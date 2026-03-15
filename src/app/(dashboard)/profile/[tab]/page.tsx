import ProfileContainerPage from "@/modules/profile/ProfileContainerPage";
import { notFound } from "next/navigation";

const validTabs = ["profile_data", "security", "payment"] as const;

export default async function ProfileTabPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;

  if (!validTabs.includes(tab as (typeof validTabs)[number])) {
    notFound();
  }

  return <ProfileContainerPage />;
}