/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Badge,
  Typography,
} from "@mui/material";
import {
  Users,
  UserPlus2,
  Activity,
  UserX,
  Search,
  Box,
  Calendar,
  CircleDot,
  Container,
  Fingerprint,
  MapPin,
  MoreVertical,
} from "lucide-react";
import { useMemo, useState } from "react";
import { mockUsers } from "../interfaces/mochAdminUsers.data";
import { UserMenu } from "../ui/statCard.ui";
import { RoleChip } from "../function/roleChip.function";
import { User } from "../interfaces/adminUsers.interface";

export const AdminUserTable = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const theme = useMemo(() => {
    return darkMode
      ? {
          bg: "#0F172A",
          paper: "#1E293B",
          textPrimary: "#F8FAFC",
          textSecondary: "#94A3B8",
          accent: "#FFC83D",
          success: "#4ADE80",
          error: "#F87171",
          border: "rgba(148, 163, 184, 0.15)",
          gradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
        }
      : {
          bg: "#F1F5F9",
          paper: "#FFFFFF",
          textPrimary: "#1E293B",
          textSecondary: "#64748B",
          accent: "#E0A800",
          success: "#22C55E",
          error: "#EF4444",
          border: "rgba(0, 0, 0, 0.05)",
          gradient: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
        };
  }, [darkMode]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString() === searchTerm,
  );

  return (
    <Container>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          bgcolor: theme.paper,
          border: `1px solid ${theme.border}`,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  bgcolor: theme.paper,
                  borderBottom: `2px solid ${theme.border}`,
                  color: theme.textSecondary,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                },
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>Usuário & Detalhes</TableCell>
              <TableCell>Cargo / Role</TableCell>
              <TableCell>Localização</TableCell>
              <TableCell>Registro</TableCell>
              <TableCell>Último Login</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  "& td": {
                    borderBottom: `1px solid ${theme.border}`,
                    py: 2.5,
                  },
                  "&:last-child td": { border: 0 },
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Fingerprint
                      size={14}
                      style={{ color: theme.accent, opacity: 0.7 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: 600,
                        color: theme.textSecondary,
                      }}
                    >
                      {user.id.toString().padStart(4, "0")}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      sx={{
                        "& .MuiBadge-badge": {
                          bgcolor: user.isOnline
                            ? theme.success
                            : theme.textSecondary,
                          boxShadow: `0 0 0 2px ${theme.paper}`,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 44,
                          height: 44,
                          bgcolor: theme.accent,
                          color: "#1A2B42",
                          fontWeight: 800,
                        }}
                      >
                        {user.avatar}
                      </Avatar>
                    </Badge>
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {user.name}
                        </Typography>
                        {user.isNew && (
                          <Chip
                            label="NOVO"
                            size="small"
                            sx={{
                              height: 16,
                              fontSize: "0.6rem",
                              fontWeight: 900,
                              bgcolor: "rgba(74, 222, 128, 0.1)",
                              color: theme.success,
                            }}
                          />
                        )}
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.textSecondary }}
                      >
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <RoleChip role={user.role} />
                </TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ color: theme.textSecondary }}
                  >
                    <MapPin size={14} />
                    <Typography variant="caption">{user.location}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ color: theme.textSecondary }}
                  >
                    <Calendar size={14} />
                    <Typography variant="caption">{user.createdAt}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircleDot
                      size={8}
                      color={
                        user.isOnline ? theme.success : theme.textSecondary
                      }
                      fill={user.isOnline ? theme.success : "transparent"}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: theme.textSecondary }}
                    >
                      {user.lastLogin}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, user)}
                    sx={{
                      color: theme.textSecondary,
                      "&:hover": { color: theme.textPrimary },
                    }}
                  >
                    <MoreVertical size={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menus e Modais */}
      <UserMenu
        anchorEl={anchorEl}
        user={selectedUser}
        onClose={handleMenuClose}
        theme={theme}
      />
    </Container>
  );
};
