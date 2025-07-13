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
import { ThemeToggle } from "../theme/theme-toggle";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{ boxShadow: "none", borderRadius: 0 }}
    >
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
        >
          <Box
            component="img"
            src="myimages/RTSMlogo.svg"
            alt="Logo"
            sx={{
              width: 50,
              height: 50,
              borderRadius: 0,
              display: "block",
              marginRight: 7,
            }}
          />
          RT Sports Manager
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" sx={{ mx: 1 }}>
            Início
          </Button>
          <Button color="inherit" sx={{ mx: 1 }}>
            Recursos
          </Button>
          <Button color="inherit" sx={{ mx: 1 }}>
            Como Funciona
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ ml: 2, px: 3 }}
            LinkComponent="a"
            href="/register"
          >
            Cadastre-se
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ ml: 1, px: 3 }}
            LinkComponent="a"
            href="/login"
          >
            Login
          </Button>
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
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
