/* eslint-disable @typescript-eslint/no-unused-vars */
// import {
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Avatar,
//   Chip,
// } from "@mui/material";
// import { Container, Box } from "@mui/system";
// import { recentUsers } from "../../../interface/recentUsersData";

// export function AdminUsers() {
//   return (
//     <Container>
//       <Paper>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Usuário</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Função</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {recentUsers.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
//                       {user.name}
//                     </Box>
//                   </TableCell>

//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.role}</TableCell>

//                   <TableCell>
//                     <Chip
//                       label={user.status}
//                       color={
//                         user.status === "Ativo"
//                           ? "success"
//                           : user.status === "Pendente"
//                             ? "warning"
//                             : "default"
//                       }
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Container>
//   );
// }
// import React, { useState, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Stack,
//   Button,
//   TextField,
//   InputAdornment,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
//   Container,
//   Grid,
//   LinearProgress,
//   Badge,
// } from "@mui/material";
// import {
//   Search,
//   UserPlus,
//   MoreVertical,
//   UserMinus,
//   UserCheck,
//   Trash2,
//   Mail,
//   Edit3,
//   Sun,
//   Moon,
//   ShieldCheck,
//   Shield,
//   Users,
//   UserPlus2,
//   Activity,
//   UserX,
//   MapPin,
//   Calendar,
//   CircleDot,
//   Download,
//   Fingerprint,
// } from "lucide-react";

// // Mock Data expandido para simular GetUserDTO complexo
// const mockUsers = [
//   {
//     id: 1,
//     name: "Alice Silva",
//     email: "alice@empresa.com",
//     role: "SUPER_ADMIN",
//     status: "active",
//     isNew: true,
//     isOnline: true,
//     avatar: "AS",
//     createdAt: "2024-02-15",
//     lastLogin: "2 min atrás",
//     location: "São Paulo, BR",
//   },
//   {
//     id: 2,
//     name: "Bruno Costa",
//     email: "bruno@empresa.com",
//     role: "ADMIN",
//     status: "active",
//     isNew: false,
//     isOnline: false,
//     avatar: "BC",
//     createdAt: "2023-11-10",
//     lastLogin: "2 dias atrás",
//     location: "Rio de Janeiro, BR",
//   },
//   {
//     id: 3,
//     name: "Carla Souza",
//     email: "carla@cliente.com",
//     role: "USER",
//     status: "suspended",
//     isNew: false,
//     isOnline: false,
//     avatar: "CS",
//     createdAt: "2024-01-05",
//     lastLogin: "1 mês atrás",
//     location: "Lisboa, PT",
//   },
//   {
//     id: 4,
//     name: "Daniel Oliveira",
//     email: "daniel@cliente.com",
//     role: "USER",
//     status: "active",
//     isNew: true,
//     isOnline: true,
//     avatar: "DO",
//     createdAt: "2024-02-20",
//     lastLogin: "Agora",
//     location: "Curitiba, BR",
//   },
// ];

// const AdminUsers = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState(mockUsers);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const theme = useMemo(() => {
//     return darkMode
//       ? {
//           bg: "#0F172A",
//           paper: "#1E293B",
//           textPrimary: "#F8FAFC",
//           textSecondary: "#94A3B8",
//           accent: "#FFC83D",
//           success: "#4ADE80",
//           error: "#F87171",
//           border: "rgba(148, 163, 184, 0.15)",
//           gradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
//         }
//       : {
//           bg: "#F1F5F9",
//           paper: "#FFFFFF",
//           textPrimary: "#1E293B",
//           textSecondary: "#64748B",
//           accent: "#E0A800",
//           success: "#22C55E",
//           error: "#EF4444",
//           border: "rgba(0, 0, 0, 0.05)",
//           gradient: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
//         };
//   }, [darkMode]);

//   const handleMenuOpen = (event, user) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedUser(user);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.id.toString() === searchTerm,
//   );

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: theme.bg,
//         color: theme.textPrimary,
//         p: { xs: 2, md: 4 },
//         transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//       }}
//     >
//       <Container maxWidth="xl">
//         {/* Superior: Título e Botões de Ação */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             justifyContent: "space-between",
//             alignItems: { md: "center" },
//             mb: 4,
//             gap: 3,
//           }}
//         >
//           <Box>
//             <Typography
//               variant="h4"
//               sx={{ fontWeight: 800, letterSpacing: "-0.02em", mb: 0.5 }}
//             >
//               Diretório de Membros
//             </Typography>
//             <Typography
//               sx={{
//                 color: theme.textSecondary,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <Users size={16} /> {users.length} usuários registrados no
//               ecossistema
//             </Typography>
//           </Box>

//           <Stack direction="row" spacing={2}>
//             <IconButton
//               onClick={() => setDarkMode(!darkMode)}
//               sx={{
//                 bgcolor: theme.paper,
//                 border: `1px solid ${theme.border}`,
//                 color: theme.textPrimary,
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//               }}
//             >
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </IconButton>
//             <Button
//               variant="contained"
//               startIcon={<Download size={18} />}
//               sx={{
//                 bgcolor: theme.paper,
//                 border: `1px solid ${theme.border}`,
//                 color: theme.textPrimary,
//                 "&:hover": { bgcolor: theme.paper, opacity: 0.8 },
//               }}
//             >
//               Exportar
//             </Button>
//             <Button
//               variant="contained"
//               startIcon={<UserPlus size={18} />}
//               sx={{
//                 bgcolor: theme.accent,
//                 color: "#1A2B42",
//                 fontWeight: 700,
//                 px: 3,
//                 "&:hover": {
//                   bgcolor: theme.accent,
//                   transform: "translateY(-2px)",
//                 },
//                 transition: "0.2s",
//               }}
//             >
//               Criar Usuário
//             </Button>
//           </Stack>
//         </Box>

//         {/* Dash de KPIs Rápidos */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Total de Usuários"
//               value={users.length}
//               icon={<Users color={theme.accent} />}
//               trend="+12% este mês"
//               theme={theme}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Novos (24h)"
//               value="2"
//               icon={<UserPlus2 color="#4ade80" />}
//               trend="Novos registros"
//               theme={theme}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Atividade Média"
//               value="84%"
//               icon={<Activity color="#60a5fa" />}
//               theme={theme}
//               showProgress
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Suspensos"
//               value="1"
//               icon={<UserX color="#f87171" />}
//               trend="Ação necessária"
//               theme={theme}
//             />
//           </Grid>
//         </Grid>

//         {/* Filtros e Busca de E-mail */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: 2.5,
//             mb: 3,
//             bgcolor: theme.paper,
//             border: `1px solid ${theme.border}`,
//             borderRadius: 4,
//             display: "flex",
//             gap: 2,
//             alignItems: "center",
//           }}
//         >
//           <TextField
//             fullWidth
//             placeholder="Pesquisar por ID, nome, cargo ou e-mail corporativo..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search size={20} style={{ color: theme.textSecondary }} />
//                 </InputAdornment>
//               ),
//               sx: {
//                 borderRadius: 3,
//                 color: theme.textPrimary,
//                 bgcolor: darkMode ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.02)",
//                 "& fieldset": { borderColor: theme.border },
//               },
//             }}
//           />
//         </Paper>

//         {/* Tabela de Gestão */}
//         <TableContainer
//           component={Paper}
//           elevation={0}
//           sx={{
//             bgcolor: theme.paper,
//             border: `1px solid ${theme.border}`,
//             borderRadius: 4,
//             overflow: "hidden",
//           }}
//         >
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow
//                 sx={{
//                   "& th": {
//                     bgcolor: theme.paper,
//                     borderBottom: `2px solid ${theme.border}`,
//                     color: theme.textSecondary,
//                     fontWeight: 700,
//                     fontSize: "0.75rem",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.05em",
//                   },
//                 }}
//               >
//                 <TableCell>ID</TableCell>
//                 <TableCell>Usuário & Detalhes</TableCell>
//                 <TableCell>Cargo / Role</TableCell>
//                 <TableCell>Localização</TableCell>
//                 <TableCell>Registro</TableCell>
//                 <TableCell>Último Login</TableCell>
//                 <TableCell align="right">Ações</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredUsers.map((user) => (
//                 <TableRow
//                   key={user.id}
//                   hover
//                   sx={{
//                     "& td": {
//                       borderBottom: `1px solid ${theme.border}`,
//                       py: 2.5,
//                     },
//                     "&:last-child td": { border: 0 },
//                   }}
//                 >
//                   <TableCell>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <Fingerprint
//                         size={14}
//                         style={{ color: theme.accent, opacity: 0.7 }}
//                       />
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           fontFamily: "monospace",
//                           fontWeight: 600,
//                           color: theme.textSecondary,
//                         }}
//                       >
//                         {user.id.toString().padStart(4, "0")}
//                       </Typography>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <Badge
//                         overlap="circular"
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "right",
//                         }}
//                         variant="dot"
//                         sx={{
//                           "& .MuiBadge-badge": {
//                             bgcolor: user.isOnline
//                               ? theme.success
//                               : theme.textSecondary,
//                             boxShadow: `0 0 0 2px ${theme.paper}`,
//                           },
//                         }}
//                       >
//                         <Avatar
//                           sx={{
//                             width: 44,
//                             height: 44,
//                             bgcolor: theme.accent,
//                             color: "#1A2B42",
//                             fontWeight: 800,
//                           }}
//                         >
//                           {user.avatar}
//                         </Avatar>
//                       </Badge>
//                       <Box>
//                         <Stack direction="row" spacing={1} alignItems="center">
//                           <Typography variant="body2" sx={{ fontWeight: 700 }}>
//                             {user.name}
//                           </Typography>
//                           {user.isNew && (
//                             <Chip
//                               label="NOVO"
//                               size="small"
//                               sx={{
//                                 height: 16,
//                                 fontSize: "0.6rem",
//                                 fontWeight: 900,
//                                 bgcolor: "rgba(74, 222, 128, 0.1)",
//                                 color: theme.success,
//                               }}
//                             />
//                           )}
//                         </Stack>
//                         <Typography
//                           variant="caption"
//                           sx={{ color: theme.textSecondary }}
//                         >
//                           {user.email}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>
//                     <RoleChip role={user.role} />
//                   </TableCell>
//                   <TableCell>
//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       alignItems="center"
//                       sx={{ color: theme.textSecondary }}
//                     >
//                       <MapPin size={14} />
//                       <Typography variant="caption">{user.location}</Typography>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>
//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       alignItems="center"
//                       sx={{ color: theme.textSecondary }}
//                     >
//                       <Calendar size={14} />
//                       <Typography variant="caption">
//                         {user.createdAt}
//                       </Typography>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <CircleDot
//                         size={8}
//                         color={
//                           user.isOnline ? theme.success : theme.textSecondary
//                         }
//                         fill={user.isOnline ? theme.success : "transparent"}
//                       />
//                       <Typography
//                         variant="caption"
//                         sx={{ color: theme.textSecondary }}
//                       >
//                         {user.lastLogin}
//                       </Typography>
//                     </Stack>
//                   </TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       onClick={(e) => handleMenuOpen(e, user)}
//                       sx={{
//                         color: theme.textSecondary,
//                         "&:hover": { color: theme.textPrimary },
//                       }}
//                     >
//                       <MoreVertical size={20} />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Menus e Modais */}
//         <UserMenu
//           anchorEl={anchorEl}
//           user={selectedUser}
//           onClose={handleMenuClose}
//           theme={theme}
//         />
//       </Container>
//     </Box>
//   );
// };

// // Componente para Cards de Estatísticas
// const StatCard = ({ title, value, icon, trend, theme, showProgress }) => (
//   <Paper
//     elevation={0}
//     sx={{
//       p: 3,
//       bgcolor: theme.paper,
//       border: `1px solid ${theme.border}`,
//       borderRadius: 4,
//       height: "100%",
//       position: "relative",
//       overflow: "hidden",
//     }}
//   >
//     <Stack
//       direction="row"
//       justifyContent="space-between"
//       alignItems="center"
//       sx={{ mb: 1 }}
//     >
//       <Typography
//         variant="caption"
//         sx={{
//           color: theme.textSecondary,
//           fontWeight: 700,
//           letterSpacing: "0.05em",
//         }}
//       >
//         {title}
//       </Typography>
//       <Box sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)" }}>
//         {icon}
//       </Box>
//     </Stack>
//     <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
//       {value}
//     </Typography>
//     {trend && (
//       <Typography
//         variant="caption"
//         sx={{ color: theme.success, fontWeight: 600 }}
//       >
//         {trend}
//       </Typography>
//     )}
//     {showProgress && (
//       <LinearProgress
//         variant="determinate"
//         value={84}
//         sx={{
//           mt: 2,
//           height: 4,
//           borderRadius: 2,
//           bgcolor: "rgba(0,0,0,0.1)",
//           "& .MuiLinearProgress-bar": { bgcolor: "#60a5fa" },
//         }}
//       />
//     )}
//   </Paper>
// );

// // Componente de Menu de Ações
// const UserMenu = ({ anchorEl, user, onClose, theme }) => (
//   <Menu
//     anchorEl={anchorEl}
//     open={Boolean(anchorEl)}
//     onClose={onClose}
//     transformOrigin={{ horizontal: "right", vertical: "top" }}
//     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//     PaperProps={{
//       sx: {
//         bgcolor: theme.paper,
//         color: theme.textPrimary,
//         border: `1px solid ${theme.border}`,
//         borderRadius: 3,
//         mt: 1,
//         minWidth: 200,
//         boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
//       },
//     }}
//   >
//     <Box sx={{ px: 2, py: 1.5 }}>
//       <Typography
//         variant="caption"
//         sx={{
//           color: theme.textSecondary,
//           fontWeight: 800,
//           textTransform: "uppercase",
//           fontSize: "0.65rem",
//         }}
//       >
//         Operações de Admin
//       </Typography>
//     </Box>
//     <MenuItem onClick={onClose}>
//       <Stack direction="row" spacing={1.5}>
//         <Edit3 size={16} />{" "}
//         <Typography variant="body2">Editar Perfil</Typography>
//       </Stack>
//     </MenuItem>
//     <MenuItem onClick={onClose}>
//       <Stack direction="row" spacing={1.5}>
//         <Mail size={16} />{" "}
//         <Typography variant="body2">Enviar Mensagem</Typography>
//       </Stack>
//     </MenuItem>
//     <Divider sx={{ my: 1, borderColor: theme.border }} />
//     <MenuItem onClick={onClose} sx={{ color: theme.accent }}>
//       <Stack direction="row" spacing={1.5}>
//         <ShieldCheck size={16} />{" "}
//         <Typography variant="body2">Promover a Admin</Typography>
//       </Stack>
//     </MenuItem>
//     <MenuItem
//       onClick={onClose}
//       sx={{ color: user?.status === "active" ? "#fb923c" : "#4ade80" }}
//     >
//       <Stack direction="row" spacing={1.5}>
//         {user?.status === "active" ? (
//           <UserMinus size={16} />
//         ) : (
//           <UserCheck size={16} />
//         )}{" "}
//         <Typography variant="body2">
//           {user?.status === "active" ? "Suspender Acesso" : "Ativar Conta"}
//         </Typography>
//       </Stack>
//     </MenuItem>
//     <MenuItem onClick={onClose} sx={{ color: "#f87171" }}>
//       <Stack direction="row" spacing={1.5}>
//         <Trash2 size={16} />{" "}
//         <Typography variant="body2">Excluir Registro</Typography>
//       </Stack>
//     </MenuItem>
//   </Menu>
// );

// const RoleChip = ({ role }) => {
//   const styles = {
//     SUPER_ADMIN: {
//       color: "#FFC83D",
//       bg: "rgba(255, 200, 61, 0.15)",
//       icon: <ShieldCheck size={12} />,
//     },
//     ADMIN: {
//       color: "#60a5fa",
//       bg: "rgba(96, 165, 250, 0.15)",
//       icon: <Shield size={12} />,
//     },
//     USER: {
//       color: "#94a3b8",
//       bg: "rgba(148, 163, 184, 0.15)",
//       icon: <Users size={12} />,
//     },
//   };
//   const current = styles[role] || styles.USER;
//   return (
//     <Chip
//       icon={current.icon}
//       label={role.replace("_", " ")}
//       size="small"
//       sx={{
//         bgcolor: current.bg,
//         color: current.color,
//         fontWeight: 800,
//         fontSize: "0.65rem",
//         border: `1px solid ${current.color}33`,
//         "& .MuiChip-icon": { color: "inherit" },
//       }}
//     />
//   );
// };

// export default AdminUsers;

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
      <Container maxWidth="xl">
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
