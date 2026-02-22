import { Chip } from "@mui/material";
import { Role } from "../interfaces/adminUsers.interface";
import { ShieldCheck, Shield, Users } from "lucide-react";

interface RoleChipProps {
  role: Role;
}

export const RoleChip: React.FC<RoleChipProps> = ({ role }) => {
  const styles = {
    SUPER_ADMIN: {
      color: "#FFC83D",
      bg: "rgba(255, 200, 61, 0.15)",
      icon: <ShieldCheck size={12} />,
    },
    ADMIN: {
      color: "#60a5fa",
      bg: "rgba(96, 165, 250, 0.15)",
      icon: <Shield size={12} />,
    },
    USER: {
      color: "#94a3b8",
      bg: "rgba(148, 163, 184, 0.15)",
      icon: <Users size={12} />,
    },
  };
  const current = styles[role] || styles.USER;
  return (
    <Chip
      icon={current.icon}
      label={role.replace("_", " ")}
      size="small"
      sx={{
        bgcolor: current.bg,
        color: current.color,
        fontWeight: 800,
        fontSize: "0.65rem",
        border: `1px solid ${current.color}33`,
        "& .MuiChip-icon": { color: "inherit" },
      }}
    />
  );
};
