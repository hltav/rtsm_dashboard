import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { SearchInput } from "./search-input";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ProfileAvatar } from "../../../../modules/dashboard/navbar/profile-avatar";

interface DashboardNavbarProps {
  carousel: React.ReactNode;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ carousel }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar>
        <Box sx={{ display: { xs: "none", sm: "block" }, color: "white" }}>
     
        </Box>
        <SearchInput />
        <Box sx={{ flexGrow: 1 }} />
        <ThemeToggle />
        <ProfileAvatar />
      </Toolbar>
      {carousel}
    </AppBar>
  );
};

export default DashboardNavbar;
