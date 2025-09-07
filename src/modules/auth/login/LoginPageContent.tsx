"use client";
import React from "react";
import { Box, Container, Paper } from "@mui/material";
import LoginForm from "@/modules/auth/login/components/LoginForm";
import LoginMarketing from "./components/LoginMarketing";

const LoginContentPage: React.FC = () => {
  return (
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
            maxWidth: { xs: "95%", sm: "700px", md: "900px" },
            maxHeight: { xs: "unset", md: "calc(90vh - 40px)" },
            margin: { xs: "0 auto", md: "20px auto" },
          }}
        >
          <LoginMarketing />
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginContentPage;
