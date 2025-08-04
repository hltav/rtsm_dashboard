
import MainContent from "@/components/dashboard/layout/MainContent";
import ProfileContentPage from "@/components/profile/ProfileContentPage";
import { useDashboard } from "@/components/Providers/DashboardContext";

const MenuContent = () => {
  const { selectedPage } = useDashboard();

  switch (selectedPage) {
    case "profile":
      return <ProfileContentPage />;
    case "main":
    default:
      return <MainContent />;
  }
};

export default MenuContent;