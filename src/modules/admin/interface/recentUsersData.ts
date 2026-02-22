type UserStatus = "Ativo" | "Pendente" | "Inativo";
type UserRole = "Admin" | "Editor" | "User";

type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export const recentUsers: User[] = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana@tech.com",
    role: "Admin",
    status: "Ativo",
  },
  {
    id: 2,
    name: "Carlos Souza",
    email: "carlos@tech.com",
    role: "Editor",
    status: "Pendente",
  },
  {
    id: 3,
    name: "Bia Santos",
    email: "bia@tech.com",
    role: "User",
    status: "Ativo",
  },
  {
    id: 4,
    name: "Douglas Lima",
    email: "doug@tech.com",
    role: "User",
    status: "Inativo",
  },
];
