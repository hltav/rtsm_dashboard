"use client";
import React from "react";
import { Box, Container, Paper } from "@mui/material";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";
import ResetPasswordForm from "./components/ResetPasswordForm";
import ResetPasswordMarketing from "./components/ResetPasswordMarketing";

const ResetPasswordContent: React.FC = () => {
  return (
    <ThemeRegistry>
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
            height: "100%",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: 3,
              overflow: "hidden",
              width: "95%",
              maxWidth: { xs: "95%", sm: "600px", md: "800px" },
              maxHeight: { xs: "unset", md: "calc(90vh - 40px)" },
              margin: { xs: "0 auto", md: "20px auto" },
            }}
          >
            <ResetPasswordMarketing />
            <ResetPasswordForm />
          </Paper>
        </Container>
      </Box>
    </ThemeRegistry>
  );
};

export default ResetPasswordContent;
