"use client";

import React from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

interface ProfileMenuProps {
  open: boolean;
  handleClose: () => void;
  handleLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  open,
  handleClose,
  handleLogout,
}) => {
  if (!open) return null;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: "relative" }}>
        <Paper
          sx={{
            position: "absolute",
            top: "45px",
            right: 0,
            zIndex: 2,
            width: 200,
            p: 2,
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Nome de Usuário
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            usuario@example.com
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          <Button
            variant="outlined"
            fullWidth
            onClick={handleLogout}
            sx={{ textTransform: "none" }}
          >
            Sair
          </Button>
        </Paper>
      </Box>
    </ClickAwayListener>
  );
};

export default ProfileMenu;