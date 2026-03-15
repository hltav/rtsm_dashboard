/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Container,
  Grid,
  LinearProgress,
  Badge,
} from "@mui/material";

import {
  Search,
  UserPlus,
  MoreVertical,
  UserMinus,
  UserCheck,
  Trash2,
  Mail,
  Edit3,
  Sun,
  Moon,
  ShieldCheck,
  Shield,
  Users,
  UserPlus2,
  Activity,
  UserX,
  MapPin,
  Calendar,
  CircleDot,
  Download,
  Fingerprint,
} from "lucide-react";

/* =====================================================
   TYPES
===================================================== */

type Role = "SUPER_ADMIN" | "ADMIN" | "USER";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: "active" | "suspended";
  isNew: boolean;
  isOnline: boolean;
  avatar: string;
  createdAt: string;
  lastLogin: string;
  location: string;
}

interface ThemeType {
  bg: string;
  paper: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  success: string;
  error: string;
  border: string;
  gradient: string;
}

/* =====================================================
   MOCK DATA
===================================================== */

const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Silva",
    email: "alice@empresa.com",
    role: "SUPER_ADMIN",
    status: "active",
    isNew: true,
    isOnline: true,
    avatar: "AS",
    createdAt: "2024-02-15",
    lastLogin: "2 min atrás",
    location: "São Paulo, BR",
  },
  {
    id: 2,
    name: "Bruno Costa",
    email: "bruno@empresa.com",
    role: "ADMIN",
    status: "active",
    isNew: false,
    isOnline: false,
    avatar: "BC",
    createdAt: "2023-11-10",
    lastLogin: "2 dias atrás",
    location: "Rio de Janeiro, BR",
  },
  {
    id: 3,
    name: "Carla Souza",
    email: "carla@cliente.com",
    role: "USER",
    status: "suspended",
    isNew: false,
    isOnline: false,
    avatar: "CS",
    createdAt: "2024-01-05",
    lastLogin: "1 mês atrás",
    location: "Lisboa, PT",
  },
];

/* =====================================================
   COMPONENT
===================================================== */

const AdminUsers: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState<User[]>(mockUsers);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const theme: ThemeType = useMemo(
    () =>
      darkMode
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
          },
    [darkMode],
  );

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
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.bg,
        color: theme.textPrimary,
        p: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ p: 0 }}>
        {/* HEADER */}
        <Stack direction="row" justifyContent="space-between" mb={4}>
          <Typography variant="h4" fontWeight={800}>
            Diretório de Membros
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>

            <Button
              startIcon={<UserPlus size={18} />}
              variant="contained"
              sx={{ bgcolor: theme.accent, color: "#1A2B42" }}
            >
              Criar Usuário
            </Button>
          </Stack>
        </Stack>

        {/* SEARCH */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* TABLE */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Último Login</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id.toString().padStart(4, "0")}</TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar>{user.avatar}</Avatar>
                      <Box>
                        <Typography fontWeight={600}>{user.name}</Typography>
                        <Typography variant="caption">{user.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <RoleChip role={user.role} />
                  </TableCell>

                  <TableCell>{user.lastLogin}</TableCell>

                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                      <MoreVertical size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <UserMenu
          anchorEl={anchorEl}
          user={selectedUser}
          onClose={handleMenuClose}
        />
      </Container>
    </Box>
  );
};

/* =====================================================
   ROLE CHIP
===================================================== */

const RoleChip: React.FC<{ role: Role }> = ({ role }) => {
  const styles: Record<Role, { color: string }> = {
    SUPER_ADMIN: { color: "#FFC83D" },
    ADMIN: { color: "#60a5fa" },
    USER: { color: "#94a3b8" },
  };

  return (
    <Chip
      label={role}
      size="small"
      sx={{
        fontWeight: 700,
        color: styles[role].color,
      }}
    />
  );
};

/* =====================================================
   USER MENU
===================================================== */

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  user: User | null;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, user, onClose }) => (
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
    <MenuItem onClick={onClose}>
      <Edit3 size={16} /> Editar
    </MenuItem>
    <MenuItem onClick={onClose}>
      <Trash2 size={16} /> Excluir
    </MenuItem>
  </Menu>
);

export default AdminUsers;
