"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface DashboardFooterProps {
  version: string;
}

const DashboardFooter: React.FC<DashboardFooterProps> = ({ version }) => {
  return (
    <Box
      component="footer"
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        mt: 8,
        py: 3,
        borderTop: 1,
        borderColor: "divider",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 12,
        color: "text.secondary",
        flexDirection: { xs: "column", sm: "row" },
        gap: 1,
      }}
    >
      <Typography variant="caption">
        © 2026 RT Sports Manager Monitoring Panel - Admin Controller
      </Typography>

      <Typography variant="caption" sx={{ fontWeight: 500 }}>
        V {version}
      </Typography>
    </Box>
  );
};

export default DashboardFooter;
