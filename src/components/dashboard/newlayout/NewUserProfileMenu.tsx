import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";

const UserProfileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("Usuário deslogado!");
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: "relative" }}>
        <IconButton onClick={handleToggle} sx={{ p: 0 }}>
          <Avatar
            alt="User Avatar"
            src="/profile-avatar.jpg"
            sx={{ width: 36, height: 36 }}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
            }}
          />
        </IconButton>
        {open && (
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
              bgcolor: "background.paper",
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
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default UserProfileMenu;