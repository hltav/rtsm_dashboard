import MainContent from "@/modules/dashboard/components/MainContent";
import ProfileContentPage from "@/modules/profile/ProfileContentPage";
import { useDashboard } from "@/components/Providers/DashboardContext";
import BankrollsPage from "@/modules/bankroll/BankrollPage";
import EventPage from "@/modules/events/EventPage";

const MenuContent = () => {
  const { selectedPage } = useDashboard();

  switch (selectedPage) {
    case "profile":
      return <ProfileContentPage />;
    case "bankrolls":
      return <BankrollsPage />;
      case "events":
      return <EventPage />;
    case "main":
    default:
      return <MainContent />;
  }
};

export default MenuContent;
