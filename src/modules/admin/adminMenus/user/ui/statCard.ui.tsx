import { Paper, Typography, LinearProgress, Divider, Menu, MenuItem } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { StatCardProps, UserMenuProps } from "../interfaces/adminUsers.interface";
import { Edit3, Mail, ShieldCheck, UserMinus, UserCheck, Trash2 } from "lucide-react";

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  theme,
  showProgress,
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      bgcolor: theme.paper,
      border: `1px solid ${theme.border}`,
      borderRadius: 4,
      height: "100%",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Typography
        variant="caption"
        sx={{
          color: theme.textSecondary,
          fontWeight: 700,
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ p: 1, borderRadius: "2", bgcolor: "rgba(255,255,255,0.03)" }}>
        {icon}
      </Box>
    </Stack>
    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
      {value}
    </Typography>
    {trend && (
      <Typography
        variant="caption"
        sx={{ color: theme.success, fontWeight: 600 }}
      >
        {trend}
      </Typography>
    )}
    {showProgress && (
      <LinearProgress
        variant="determinate"
        value={84}
        sx={{
          mt: 2,
          height: 4,
          borderRadius: 2,
          bgcolor: "rgba(0,0,0,0.1)",
          "& .MuiLinearProgress-bar": { bgcolor: "#60a5fa" },
        }}
      />
    )}
  </Paper>
);

export const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  user,
  onClose,
  theme,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    transformOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    PaperProps={{
      sx: {
        bgcolor: theme.paper,
        color: theme.textPrimary,
        border: `1px solid ${theme.border}`,
        borderRadius: 3,
        mt: 1,
        minWidth: 200,
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
      },
    }}
  >
    <Box sx={{ px: 2, py: 1.5 }}>
      <Typography
        variant="caption"
        sx={{
          color: theme.textSecondary,
          fontWeight: 800,
          textTransform: "uppercase",
          fontSize: "0.65rem",
        }}
      >
        Operações de Admin
      </Typography>
    </Box>
    <MenuItem onClick={onClose}>
      <Stack direction="row" spacing={1.5}>
        <Edit3 size={16} />{" "}
        <Typography variant="body2">Editar Perfil</Typography>
      </Stack>
    </MenuItem>
    <MenuItem onClick={onClose}>
      <Stack direction="row" spacing={1.5}>
        <Mail size={16} />{" "}
        <Typography variant="body2">Enviar Mensagem</Typography>
      </Stack>
    </MenuItem>
    <Divider sx={{ my: 1, borderColor: theme.border }} />
    <MenuItem onClick={onClose} sx={{ color: theme.accent }}>
      <Stack direction="row" spacing={1.5}>
        <ShieldCheck size={16} />{" "}
        <Typography variant="body2">Promover a Admin</Typography>
      </Stack>
    </MenuItem>
    <MenuItem
      onClick={onClose}
      sx={{ color: user?.status === "active" ? "#fb923c" : "#4ade80" }}
    >
      <Stack direction="row" spacing={1.5}>
        {user?.status === "active" ? (
          <UserMinus size={16} />
        ) : (
          <UserCheck size={16} />
        )}{" "}
        <Typography variant="body2">
          {user?.status === "active" ? "Suspender Acesso" : "Ativar Conta"}
        </Typography>
      </Stack>
    </MenuItem>
    <MenuItem onClick={onClose} sx={{ color: "#f87171" }}>
      <Stack direction="row" spacing={1.5}>
        <Trash2 size={16} />{" "}
        <Typography variant="body2">Excluir Registro</Typography>
      </Stack>
    </MenuItem>
  </Menu>
);
