"use client";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@/components/Providers/AuthContext";

export const ProfileAvatar: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // --- Trate o estado de carregamento do AuthContext ---
  if (loading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
        <CircularProgress size={24} /> {/* Exibe um spinner de carregamento */}
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  const userName = `${user.firstname} ${user.lastname}`;
  const userEmail = user.email;
  const fallbackAvatar = `https://placehold.co/32x32/d1d1d1/000000?text=${user.firstname.charAt(
    0
  )}${user.lastname.charAt(0)}`;
  const userAvatarUrl = user.clientData?.image || fallbackAvatar;
  console.log(userAvatarUrl);

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          src={userAvatarUrl}
          alt={userName}
          sx={{ width: 50, height: 50 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Informações do usuário no cabeçalho do menu */}
        <MenuItem sx={{ py: 1, px: 2 }}>
          <Avatar src={userAvatarUrl} alt={userName} />
          <Box>
            <Typography variant="subtitle1">{userName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {userEmail}
            </Typography>
          </Box>
        </MenuItem>
        {/* Itens do menu */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Meu Perfil
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
