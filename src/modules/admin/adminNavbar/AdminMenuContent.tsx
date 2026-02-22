import EventPage from "@/modules/events/EventPage";
import ProfileContainerPage from "@/modules/profile/ProfileContainerPage";
import { useAdmin } from "@/components/Providers/AdminContext";
import AdminMain from "../adminMain/AdminMain";
import { AppUsers } from "../adminMenus/user/UserTest";
import Monitoring from "../adminMenus/monitoring/Monitoring";

const AdminMenuContent = () => {
  const { selectedPage } = useAdmin();

  switch (selectedPage) {
    case "config":
      return <ProfileContainerPage />;
    case "users":
      return <AppUsers />;
    case "reports":
      return <EventPage />;
    case "monitoring":
      return <Monitoring />;
    case "adminMain":
    default:
      return <AdminMain />;
  }
};

export default AdminMenuContent;
