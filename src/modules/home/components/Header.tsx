"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="primary"
      sx={{ boxShadow: "none", borderRadius: 0, backgroundColor: "#1A2B42" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
        >
          <Box
            component="img"
            src="rtsm.svg"
            alt="Logo"
            m={1}
            sx={{
              width: 60,
              height: 60,
              borderRadius: 0,
              display: "block",

              "@media (max-width:400px)": {
                marginRight: 3,
              },
            }}
          />
          <span translate="no" style={{ color: "#E0A800" }}>
            RT Sports Manager
          </span>
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            component={Link}
            href="#top"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Início
          </Button>
          <Button
            component={Link}
            href="#features-section"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Recursos
          </Button>
          <Button
            component={Link}
            href="#how-it-works"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Como Funciona
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ ml: 2, px: 3, color: "#1A2B42", backgroundColor: "#E0A800" }}
            LinkComponent="a"
            href="/register"
          >
            Cadastre-se
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ ml: 1, px: 3, color: "#E0A800", borderColor: "#E0A800" }}
            LinkComponent="a"
            href="/login"
          >
            Login
          </Button>
          <ThemeToggle />
        </Box>

        <IconButton
          color="inherit"
          aria-label="open menu"
          edge="end"
          onClick={onMenuToggle}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "flex", md: "none" }, ml: 0 }}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
