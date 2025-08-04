import React, { ReactNode } from "react";
import { Box, Container, CssBaseline, Paper } from "@mui/material";

interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => (
  <>
    <CssBaseline />
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: { xs: 2, sm: 3, md: 0 },
      }}
    >
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            width: "95%",
            maxWidth: { xs: "95%", sm: "700px" },
            margin: { xs: "20px auto", md: "20px auto" },
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  </>
);

export default ProfileLayout;