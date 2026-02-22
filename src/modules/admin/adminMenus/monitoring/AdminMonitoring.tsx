// /* eslint-disable @typescript-eslint/no-unused-vars */
// // /* eslint-disable @typescript-eslint/no-unused-vars */
// // "use client";
// // import React, { useState, useMemo } from "react";
// // import {
// //   Activity,
// //   Database,
// //   Server,
// //   Clock,
// //   ArrowUpRight,
// //   ArrowDownRight,
// //   Sun,
// //   Moon,
// //   RefreshCw,
// // } from "lucide-react";
// // import { DatabaseMetrics, ErrorItem, MetricCardProps, RequestItem, ThemeType } from "./props/metricCard.props";
// // import { generateMockDatabaseMetrics, generateMockErrors, generateMockRequests } from "./props/mocks.generators";

// // const AdminMonitoring: React.FC = () => {
// //   const [darkMode, setDarkMode] = useState(true);
// //   const [dbMetrics, setDbMetrics] = useState<DatabaseMetrics>(
// //     generateMockDatabaseMetrics(),
// //   );
// //   const [requests, setRequests] = useState<RequestItem[]>(
// //     generateMockRequests(),
// //   );
// //   const [errors, setErrors] = useState<ErrorItem[]>(generateMockErrors());
// //   const [period, setPeriod] = useState("24h");
// //   const [isRefreshing, setIsRefreshing] = useState(false);

// //   const refreshData = () => {
// //     setIsRefreshing(true);
// //     setTimeout(() => {
// //       setDbMetrics(generateMockDatabaseMetrics());
// //       setRequests(generateMockRequests());
// //       setErrors(generateMockErrors());
// //       setIsRefreshing(false);
// //     }, 800);
// //   };

// //   const theme: ThemeType = useMemo(() => {
// //     return darkMode
// //       ? {
// //           bg: "#121212",
// //           paper: "#1A2B42",
// //           primary: "#1A2B42",
// //           secondary: "#FFC83D",
// //           textPrimary: "#E0E0E0",
// //           textSecondary: "#B0B0B0",
// //           border: "rgba(255, 255, 255, 0.1)",
// //         }
// //       : {
// //           bg: "#f4f6f8",
// //           paper: "#e9e5e5",
// //           primary: "#1A2B42",
// //           secondary: "#E0A800",
// //           textPrimary: "#1A2B42",
// //           textSecondary: "#555",
// //           border: "rgba(0, 0, 0, 0.1)",
// //         };
// //   }, [darkMode]);

// //   return (
// //     <div
// //       className="min-h-screen p-6 transition-colors duration-300"
// //       style={{
// //         backgroundColor: theme.bg,
// //         color: theme.textPrimary,
// //       }}
// //     >
// //       {/* ================= HEADER ================= */}
// //       <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold">Monitoramento de Sistema</h1>
// //           <p style={{ color: theme.textSecondary }}>
// //             Admin Dash / Performance & Metrics
// //           </p>
// //         </div>

// //         <div className="flex items-center gap-3">
// //           <button
// //             onClick={refreshData}
// //             aria-label="Atualizar dados"
// //             title="Atualizar dados"
// //             className={`p-2 rounded-lg border ${
// //               isRefreshing ? "animate-spin" : ""
// //             }`}
// //             style={{
// //               borderColor: theme.border,
// //               backgroundColor: theme.paper,
// //             }}
// //           >
// //             <RefreshCw size={20} />
// //           </button>

// //           <button
// //             onClick={() => setDarkMode(!darkMode)}
// //             aria-label="Alternar tema"
// //             title="Alternar tema"
// //             className="p-2 rounded-lg border"
// //             style={{
// //               borderColor: theme.border,
// //               backgroundColor: theme.paper,
// //             }}
// //           >
// //             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
// //           </button>

// //           <div>
// //             <label htmlFor="period" className="sr-only">
// //               Selecionar período
// //             </label>
// //             <select
// //               id="period"
// //               aria-label="Selecionar período"
// //               value={period}
// //               onChange={(e) => setPeriod(e.target.value)}
// //               className="px-4 py-2 rounded-lg border"
// //               style={{
// //                 backgroundColor: theme.paper,
// //                 borderColor: theme.border,
// //                 color: theme.textPrimary,
// //               }}
// //             >
// //               <option value="1h">Última Hora</option>
// //               <option value="24h">Últimas 24h</option>
// //               <option value="7d">Últimos 7 dias</option>
// //               <option value="30d">Último Mês</option>
// //             </select>
// //           </div>
// //         </div>
// //       </header>

// //       {/* ================= METRICS ================= */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
// //         <MetricCard
// //           title="Latência"
// //           value={`${dbMetrics.latency} ms`}
// //           icon={<Database />}
// //           trend="+2.4%"
// //           trendUp={false}
// //           theme={theme}
// //         />
// //         <MetricCard
// //           title="Conexões Ativas"
// //           value={dbMetrics.activeConnections}
// //           icon={<Activity />}
// //           trend="+12"
// //           trendUp
// //           theme={theme}
// //         />
// //         <MetricCard
// //           title="Uso de CPU"
// //           value={`${dbMetrics.cpuUsage}%`}
// //           icon={<Server />}
// //           theme={theme}
// //         />
// //         <MetricCard
// //           title="Uptime"
// //           value={dbMetrics.uptime}
// //           icon={<Clock />}
// //           theme={theme}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // /* =========================================================
// //    METRIC CARD
// // ========================================================= */

// // const MetricCard: React.FC<MetricCardProps> = ({
// //   title,
// //   value,
// //   icon,
// //   trend,
// //   trendUp,
// //   theme,
// // }) => {
// //   return (
// //     <div
// //       className="rounded-xl p-5 border"
// //       style={{
// //         backgroundColor: theme.paper,
// //         borderColor: theme.border,
// //       }}
// //     >
// //       <div className="flex justify-between mb-4">
// //         <div>{icon}</div>

// //         {trend && (
// //           <div
// //             className={`flex items-center text-xs font-bold ${
// //               trendUp ? "text-green-400" : "text-red-400"
// //             }`}
// //           >
// //             {trend}
// //             {trendUp ? (
// //               <ArrowUpRight size={14} />
// //             ) : (
// //               <ArrowDownRight size={14} />
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       <p className="text-sm" style={{ color: theme.textSecondary }}>
// //         {title}
// //       </p>
// //       <h3 className="text-2xl font-bold">{value}</h3>
// //     </div>
// //   );
// // };

// // export default AdminMonitoring;

// // import React, { useState, useMemo } from "react";
// // import {
// //   Activity,
// //   Database,
// //   Server,
// //   AlertCircle,
// //   Clock,
// //   ArrowUpRight,
// //   ArrowDownRight,
// //   Sun,
// //   Moon,
// //   BarChart3,
// //   RefreshCw,
// // } from "lucide-react";

// // /* =========================================================
// //    TYPES
// // ========================================================= */

// // interface ThemeType {
// //   bg: string;
// //   paper: string;
// //   primary: string;
// //   secondary: string;
// //   textPrimary: string;
// //   textSecondary: string;
// //   border: string;
// // }

// // interface DatabaseMetrics {
// //   latency: string;
// //   activeConnections: number;
// //   cpuUsage: string;
// //   storageUsed: string;
// //   uptime: string;
// // }

// // interface RequestItem {
// //   id: number;
// //   path: string;
// //   method: string;
// //   status: number;
// //   duration: string;
// //   timestamp: string;
// // }

// // interface ErrorItem {
// //   id: number;
// //   message: string;
// //   code: string;
// //   severity: string;
// //   time: string;
// // }

// // interface MetricCardProps {
// //   title: string;
// //   value: string | number;
// //   icon: React.ReactNode;
// //   trend?: string;
// //   trendUp?: boolean;
// //   theme: ThemeType;
// // }

// // /* =========================================================
// //    MOCK DATA
// // ========================================================= */

// // const generateMockDatabaseMetrics = (): DatabaseMetrics => ({
// //   latency: (Math.random() * 50 + 10).toFixed(2),
// //   activeConnections: Math.floor(Math.random() * 100 + 20),
// //   cpuUsage: (Math.random() * 30 + 5).toFixed(1),
// //   storageUsed: "45.2GB",
// //   uptime: "15d 4h 22m",
// // });

// // const generateMockRequests = (): RequestItem[] => [
// //   {
// //     id: 1,
// //     path: "/api/v1/users",
// //     method: "GET",
// //     status: 200,
// //     duration: "45ms",
// //     timestamp: "Agora",
// //   },
// //   {
// //     id: 2,
// //     path: "/api/v1/auth/login",
// //     method: "POST",
// //     status: 201,
// //     duration: "120ms",
// //     timestamp: "1m atrás",
// //   },
// //   {
// //     id: 3,
// //     path: "/api/v1/orders",
// //     method: "GET",
// //     status: 500,
// //     duration: "2000ms",
// //     timestamp: "3m atrás",
// //   },
// //   {
// //     id: 4,
// //     path: "/api/v1/products",
// //     method: "PUT",
// //     status: 200,
// //     duration: "89ms",
// //     timestamp: "5m atrás",
// //   },
// // ];

// // const generateMockErrors = (): ErrorItem[] => [
// //   {
// //     id: 101,
// //     message: "QueryTimeoutError: Connection limit reached",
// //     code: "E_DB_CONN",
// //     severity: "High",
// //     time: "10:45:22",
// //   },
// //   {
// //     id: 102,
// //     message: "UnauthorizedAccess: Invalid JWT Token",
// //     code: "E_AUTH_401",
// //     severity: "Medium",
// //     time: "11:02:15",
// //   },
// // ];

// // /* =========================================================
// //    COMPONENT
// // ========================================================= */

// // const App: React.FC = () => {
// //   const [darkMode, setDarkMode] = useState<boolean>(true);
// //   const [dbMetrics, setDbMetrics] = useState<DatabaseMetrics>(
// //     generateMockDatabaseMetrics(),
// //   );
// //   const [requests, setRequests] = useState<RequestItem[]>(
// //     generateMockRequests(),
// //   );
// //   const [errors, setErrors] = useState<ErrorItem[]>(generateMockErrors());
// //   const [period, setPeriod] = useState<string>("24h");
// //   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

// //   const refreshData = () => {
// //     setIsRefreshing(true);
// //     setTimeout(() => {
// //       setDbMetrics(generateMockDatabaseMetrics());
// //       setRequests(generateMockRequests());
// //       setErrors(generateMockErrors());
// //       setIsRefreshing(false);
// //     }, 800);
// //   };

// //   const theme: ThemeType = useMemo(() => {
// //     return darkMode
// //       ? {
// //           bg: "#121212",
// //           paper: "#1A2B42",
// //           primary: "#1A2B42",
// //           secondary: "#FFC83D",
// //           textPrimary: "#E0E0E0",
// //           textSecondary: "#B0B0B0",
// //           border: "rgba(255, 255, 255, 0.1)",
// //         }
// //       : {
// //           bg: "#f4f6f8",
// //           paper: "#e9e5e5",
// //           primary: "#1A2B42",
// //           secondary: "#E0A800",
// //           textPrimary: "#1A2B42",
// //           textSecondary: "#555",
// //           border: "rgba(0, 0, 0, 0.1)",
// //         };
// //   }, [darkMode]);

// //   return (
// //     <div
// //       className="min-h-screen p-4 md:p-8 transition-colors duration-300"
// //       style={{
// //         backgroundColor: theme.bg,
// //         color: theme.textPrimary,
// //         fontFamily: "Inter, sans-serif",
// //       }}
// //     >
// //       {/* HEADER */}
// //       <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
// //         <div>
// //           <h1 className="text-3xl font-bold tracking-tight mb-1">
// //             Monitoramento de Sistema
// //           </h1>
// //           <p style={{ color: theme.textSecondary }}>Performance e Métricas</p>
// //         </div>

// //         <div className="flex items-center gap-3">
// //           {/* Refresh Button */}
// //           <button
// //             onClick={refreshData}
// //             aria-label="Atualizar dados"
// //             title="Atualizar dados"
// //             className={`p-2 rounded-lg border transition-all ${isRefreshing ? "animate-spin" : ""}`}
// //             style={{ borderColor: theme.border, backgroundColor: theme.paper }}
// //           >
// //             <RefreshCw size={20} />
// //           </button>

// //           {/* Theme Toggle */}
// //           <button
// //             onClick={() => setDarkMode(!darkMode)}
// //             aria-label="Alternar tema"
// //             title="Alternar tema"
// //             className="p-2 rounded-lg border transition-all"
// //             style={{ borderColor: theme.border, backgroundColor: theme.paper }}
// //           >
// //             {darkMode ? (
// //               <Sun size={20} className="text-yellow-400" />
// //             ) : (
// //               <Moon size={20} />
// //             )}
// //           </button>

// //           {/* Period Select */}
// //           <div>
// //             <label htmlFor="period" className="sr-only">
// //               Selecionar período
// //             </label>
// //             <select
// //               id="period"
// //               aria-label="Selecionar período"
// //               value={period}
// //               onChange={(e) => setPeriod(e.target.value)}
// //               className="px-4 py-2 rounded-lg border outline-none font-medium"
// //               style={{
// //                 backgroundColor: theme.paper,
// //                 borderColor: theme.border,
// //                 color: theme.textPrimary,
// //               }}
// //             >
// //               <option value="1h">Última Hora</option>
// //               <option value="24h">Últimas 24h</option>
// //               <option value="7d">Últimos 7 dias</option>
// //               <option value="30d">Último Mês</option>
// //             </select>
// //           </div>
// //         </div>
// //       </header>

// //       {/* MAIN */}
// //       <main className="max-w-7xl mx-auto space-y-6">
// //         {/* Metrics */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //           <MetricCard
// //             title="Latência do Banco"
// //             value={`${dbMetrics.latency} ms`}
// //             icon={<Database className="text-blue-400" />}
// //             trend="+2.4%"
// //             trendUp={false}
// //             theme={theme}
// //           />
// //           <MetricCard
// //             title="Conexões Ativas"
// //             value={dbMetrics.activeConnections}
// //             icon={<Activity className="text-green-400" />}
// //             trend="+12"
// //             trendUp={true}
// //             theme={theme}
// //           />
// //           <MetricCard
// //             title="Uso de CPU"
// //             value={`${dbMetrics.cpuUsage}%`}
// //             icon={<Server className="text-purple-400" />}
// //             trend="-0.5%"
// //             trendUp={false}
// //             theme={theme}
// //           />
// //           <MetricCard
// //             title="Tempo de Atividade"
// //             value={dbMetrics.uptime}
// //             icon={<Clock className="text-orange-400" />}
// //             theme={theme}
// //           />
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-left">
// //             <thead>
// //               <tr className="border-b" style={{ borderColor: theme.border }}>
// //                 <th
// //                   className="pb-3 font-medium"
// //                   style={{ color: theme.textSecondary }}
// //                 >
// //                   Endpoint
// //                 </th>
// //                 <th
// //                   className="pb-3 font-medium"
// //                   style={{ color: theme.textSecondary }}
// //                 >
// //                   Método
// //                 </th>
// //                 <th
// //                   className="pb-3 font-medium"
// //                   style={{ color: theme.textSecondary }}
// //                 >
// //                   Status
// //                 </th>
// //                 <th
// //                   className="pb-3 font-medium"
// //                   style={{ color: theme.textSecondary }}
// //                 >
// //                   Tempo
// //                 </th>
// //               </tr>
// //             </thead>

// //             {/* 🔥 CORREÇÃO AQUI */}
// //             <tbody className="divide-y" style={{ borderColor: theme.border }}>
// //               {requests.map((req) => (
// //                 <tr key={req.id} className="hover:bg-white/5 transition-colors">
// //                   <td className="py-4 font-mono text-sm">{req.path}</td>

// //                   <td className="py-4">
// //                     <span
// //                       className={`px-2 py-1 rounded text-xs font-bold ${
// //                         req.method === "POST"
// //                           ? "bg-blue-500/20 text-blue-400"
// //                           : "bg-green-500/20 text-green-400"
// //                       }`}
// //                     >
// //                       {req.method}
// //                     </span>
// //                   </td>

// //                   <td className="py-4">
// //                     <span
// //                       className={`flex items-center gap-1 text-sm ${
// //                         req.status >= 400 ? "text-red-400" : "text-green-400"
// //                       }`}
// //                     >
// //                       <div
// //                         className={`w-2 h-2 rounded-full ${
// //                           req.status >= 400 ? "bg-red-400" : "bg-green-400"
// //                         }`}
// //                       ></div>
// //                       {req.status}
// //                     </span>
// //                   </td>

// //                   <td
// //                     className="py-4 text-sm"
// //                     style={{ color: theme.textSecondary }}
// //                   >
// //                     {req.duration}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </main>

// //       {/* FOOTER */}
// //       <footer
// //         className="max-w-7xl mx-auto mt-12 py-6 border-t flex justify-between items-center text-xs"
// //         style={{ borderColor: theme.border, color: theme.textSecondary }}
// //       >
// //         <p>© 2024 System Monitoring Panel - Admin Controller</p>
// //         <p>V 2.4.0-stable</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // /* =========================================================
// //    METRIC CARD
// // ========================================================= */

// // const MetricCard: React.FC<MetricCardProps> = ({
// //   title,
// //   value,
// //   icon,
// //   trend,
// //   trendUp,
// //   theme,
// // }) => (
// //   <div
// //     className="rounded-xl p-5 border transition-all hover:scale-[1.02]"
// //     style={{ backgroundColor: theme.paper, borderColor: theme.border }}
// //   >
// //     <div className="flex justify-between items-start mb-4">
// //       <div
// //         className="p-2 rounded-lg bg-white/5 border"
// //         style={{ borderColor: theme.border }}
// //       >
// //         {icon}
// //       </div>

// //       {trend && (
// //         <div
// //           className={`flex items-center text-xs font-bold ${trendUp ? "text-green-400" : "text-red-400"}`}
// //         >
// //           {trend}
// //           {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
// //         </div>
// //       )}
// //     </div>

// //     <div>
// //       <p
// //         className="text-sm font-medium mb-1"
// //         style={{ color: theme.textSecondary }}
// //       >
// //         {title}
// //       </p>
// //       <h3 className="text-2xl font-bold">{value}</h3>
// //     </div>
// //   </div>
// // );

// // export default App;
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Activity,
//   Database,
//   Server,
//   AlertCircle,
//   Clock,
//   ArrowUpRight,
//   ArrowDownRight,
//   Sun,
//   Moon,
//   BarChart3,
//   RefreshCw,
// } from "lucide-react";
// import { Select } from "@mui/material";
// import { MetricCardProps } from "./props/metricCard.props";

// // Mock Data Generators para simular os endpoints do controlador
// const generateMockDatabaseMetrics = () => ({
//   latency: (Math.random() * 50 + 10).toFixed(2),
//   activeConnections: Math.floor(Math.random() * 100 + 20),
//   cpuUsage: (Math.random() * 30 + 5).toFixed(1),
//   storageUsed: "45.2GB",
//   uptime: "15d 4h 22m",
// });

// const generateMockRequests = () => [
//   {
//     id: 1,
//     path: "/api/v1/users",
//     method: "GET",
//     status: 200,
//     duration: "45ms",
//     timestamp: "Agora",
//   },
//   {
//     id: 2,
//     path: "/api/v1/auth/login",
//     method: "POST",
//     status: 201,
//     duration: "120ms",
//     timestamp: "1m atrás",
//   },
//   {
//     id: 3,
//     path: "/api/v1/orders",
//     method: "GET",
//     status: 500,
//     duration: "2000ms",
//     timestamp: "3m atrás",
//   },
//   {
//     id: 4,
//     path: "/api/v1/products",
//     method: "PUT",
//     status: 200,
//     duration: "89ms",
//     timestamp: "5m atrás",
//   },
// ];

// const generateMockErrors = () => [
//   {
//     id: 101,
//     message: "QueryTimeoutError: Connection limit reached",
//     code: "E_DB_CONN",
//     severity: "High",
//     time: "10:45:22",
//   },
//   {
//     id: 102,
//     message: "UnauthorizedAccess: Invalid JWT Token",
//     code: "E_AUTH_401",
//     severity: "Medium",
//     time: "11:02:15",
//   },
// ];

// const App = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [dbMetrics, setDbMetrics] = useState(generateMockDatabaseMetrics());
//   const [requests, setRequests] = useState(generateMockRequests());
//   const [errors, setErrors] = useState(generateMockErrors());
//   const [period, setPeriod] = useState("24h");
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // Simulação de Fetching dos endpoints definidos no controlador
//   const refreshData = () => {
//     setIsRefreshing(true);
//     setTimeout(() => {
//       setDbMetrics(generateMockDatabaseMetrics());
//       setRequests(generateMockRequests());
//       setErrors(generateMockErrors());
//       setIsRefreshing(false);
//     }, 800);
//   };

//   // Cores baseadas no tema fornecido
//   const theme = useMemo(() => {
//     return darkMode
//       ? {
//           bg: "#121212",
//           paper: "#1A2B42",
//           primary: "#1A2B42",
//           secondary: "#FFC83D",
//           textPrimary: "#E0E0E0",
//           textSecondary: "#B0B0B0",
//           border: "rgba(255, 255, 255, 0.1)",
//         }
//       : {
//           bg: "#f4f6f8",
//           paper: "#e9e5e5",
//           primary: "#1A2B42",
//           secondary: "#E0A800",
//           textPrimary: "#1A2B42",
//           textSecondary: "#555",
//           border: "rgba(0, 0, 0, 0.1)",
//         };
//   }, [darkMode]);

//   return (
//     <div
//       className="min-h-screen p-4 md:p-8 transition-colors duration-300"
//       style={{
//         backgroundColor: theme.bg,
//         color: theme.textPrimary,
//         fontFamily: "Inter, sans-serif",
//       }}
//     >
//       {/* Header */}
//       <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1
//             className="text-3xl font-bold tracking-tight mb-1"
//             style={{ color: theme.textPrimary }}
//           >
//             Monitoramento de Sistema
//           </h1>
//           <p style={{ color: theme.textSecondary }}>
//             Admin Dash / Performance & Metrics
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={refreshData}
//             className={`p-2 rounded-lg border transition-all ${isRefreshing ? "animate-spin" : ""}`}
//             style={{ borderColor: theme.border, backgroundColor: theme.paper }}
//           >
//             <RefreshCw size={20} />
//           </button>

//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="p-2 rounded-lg border transition-all"
//             style={{ borderColor: theme.border, backgroundColor: theme.paper }}
//           >
//             {darkMode ? (
//               <Sun size={20} className="text-yellow-400" />
//             ) : (
//               <Moon size={20} />
//             )}
//           </button>

//           <select
//             value={period}
//             onChange={(e) => setPeriod(e.target.value)}
//             className="px-4 py-2 rounded-lg border outline-none font-medium"
//             style={{
//               backgroundColor: theme.paper,
//               borderColor: theme.border,
//               color: theme.textPrimary,
//             }}
//           >
//             <option value="1h">Última Hora</option>
//             <option value="24h">Últimas 24h</option>
//             <option value="7d">Últimos 7 dias</option>
//             <option value="30d">Último Mês</option>
//           </select>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto space-y-6">
//         {/* Database Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <MetricCard
//             title="Latência do Banco"
//             value={`${dbMetrics.latency} ms`}
//             icon={<Database className="text-blue-400" />}
//             trend="+2.4%"
//             trendUp={false}
//             theme={theme}
//           />
//           <MetricCard
//             title="Conexões Ativas"
//             value={dbMetrics.activeConnections}
//             icon={<Activity className="text-green-400" />}
//             trend="+12"
//             trendUp={true}
//             theme={theme}
//           />
//           <MetricCard
//             title="Uso de CPU"
//             value={`${dbMetrics.cpuUsage}%`}
//             icon={<Server className="text-purple-400" />}
//             trend="-0.5%"
//             trendUp={false}
//             theme={theme}
//           />
//           <MetricCard
//             title="Tempo de Atividade"
//             value={dbMetrics.uptime}
//             icon={<Clock className="text-orange-400" />}
//             theme={theme}
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Recent Requests */}
//           <div
//             className="lg:col-span-2 rounded-xl p-6 border overflow-hidden"
//             style={{ backgroundColor: theme.paper, borderColor: theme.border }}
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold flex items-center gap-2">
//                 <BarChart3 size={22} style={{ color: theme.secondary }} />
//                 Requisições Recentes
//               </h3>
//               <button
//                 className="text-sm font-medium hover:opacity-80 transition-opacity"
//                 style={{ color: theme.secondary }}
//               >
//                 Ver Todas
//               </button>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr
//                     className="border-b"
//                     style={{ borderColor: theme.border }}
//                   >
//                     <th
//                       className="pb-3 font-medium"
//                       style={{ color: theme.textSecondary }}
//                     >
//                       Endpoint
//                     </th>
//                     <th
//                       className="pb-3 font-medium"
//                       style={{ color: theme.textSecondary }}
//                     >
//                       Método
//                     </th>
//                     <th
//                       className="pb-3 font-medium"
//                       style={{ color: theme.textSecondary }}
//                     >
//                       Status
//                     </th>
//                     <th
//                       className="pb-3 font-medium"
//                       style={{ color: theme.textSecondary }}
//                     >
//                       Tempo
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody
//                   className="divide-y"
//                   style={{ borderColor: theme.border }}
//                 >
//                   {requests.map((req) => (
//                     <tr
//                       key={req.id}
//                       className="hover:bg-white/5 transition-colors"
//                     >
//                       <td className="py-4 font-mono text-sm">{req.path}</td>
//                       <td className="py-4">
//                         <span
//                           className={`px-2 py-1 rounded text-xs font-bold ${req.method === "POST" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}
//                         >
//                           {req.method}
//                         </span>
//                       </td>
//                       <td className="py-4">
//                         <span
//                           className={`flex items-center gap-1 text-sm ${req.status >= 400 ? "text-red-400" : "text-green-400"}`}
//                         >
//                           <div
//                             className={`w-2 h-2 rounded-full ${req.status >= 400 ? "bg-red-400" : "bg-green-400"}`}
//                           ></div>
//                           {req.status}
//                         </span>
//                       </td>
//                       <td
//                         className="py-4 text-sm"
//                         style={{ color: theme.textSecondary }}
//                       >
//                         {req.duration}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Critical Errors */}
//           <div
//             className="rounded-xl p-6 border"
//             style={{ backgroundColor: theme.paper, borderColor: theme.border }}
//           >
//             <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
//               <AlertCircle size={22} className="text-red-500" />
//               Erros Críticos
//             </h3>

//             <div className="space-y-4">
//               {errors.map((error) => (
//                 <div
//                   key={error.id}
//                   className="p-4 rounded-lg border-l-4 border-red-500"
//                   style={{
//                     backgroundColor: darkMode
//                       ? "rgba(0,0,0,0.2)"
//                       : "rgba(255,255,255,0.4)",
//                   }}
//                 >
//                   <div className="flex justify-between items-start mb-1">
//                     <span className="text-xs font-bold uppercase tracking-wider text-red-400">
//                       {error.code}
//                     </span>
//                     <span
//                       className="text-xs"
//                       style={{ color: theme.textSecondary }}
//                     >
//                       {error.time}
//                     </span>
//                   </div>
//                   <p className="text-sm font-medium mb-2">{error.message}</p>
//                   <div className="flex items-center gap-2">
//                     <span className="text-[10px] px-2 py-0.5 rounded bg-red-500 text-white font-bold">
//                       CRÍTICO
//                     </span>
//                   </div>
//                 </div>
//               ))}

//               <button
//                 className="w-full py-3 rounded-lg border-dashed border-2 mt-2 transition-colors hover:bg-white/5 text-sm font-medium"
//                 style={{
//                   borderColor: theme.border,
//                   color: theme.textSecondary,
//                 }}
//               >
//                 Abrir Log de Erros Completo
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Performance Report */}
//         <div
//           className="rounded-xl p-8 border"
//           style={{ backgroundColor: theme.paper, borderColor: theme.border }}
//         >
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//             <div>
//               <h3 className="text-xl font-semibold mb-1">
//                 Relatório de Performance
//               </h3>
//               <p className="text-sm" style={{ color: theme.textSecondary }}>
//                 Visão consolidada do período: {period}
//               </p>
//             </div>
//             <button
//               className="px-6 py-2 rounded-lg font-semibold transition-all shadow-lg active:scale-95"
//               style={{
//                 backgroundColor: theme.secondary,
//                 color: darkMode ? "#1A2B42" : "#fff",
//               }}
//             >
//               Exportar PDF
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center md:text-left">
//               <p
//                 className="text-sm uppercase tracking-widest font-bold mb-2"
//                 style={{ color: theme.textSecondary }}
//               >
//                 Throughput
//               </p>
//               <h4 className="text-4xl font-bold">
//                 1.2k{" "}
//                 <span className="text-lg font-normal opacity-60">req/s</span>
//               </h4>
//             </div>
//             <div className="text-center md:text-left">
//               <p
//                 className="text-sm uppercase tracking-widest font-bold mb-2"
//                 style={{ color: theme.textSecondary }}
//               >
//                 P95 Latency
//               </p>
//               <h4 className="text-4xl font-bold text-yellow-500">
//                 184{" "}
//                 <span className="text-lg font-normal opacity-60 text-white/60">
//                   ms
//                 </span>
//               </h4>
//             </div>
//             <div className="text-center md:text-left">
//               <p
//                 className="text-sm uppercase tracking-widest font-bold mb-2"
//                 style={{ color: theme.textSecondary }}
//               >
//                 Taxa de Sucesso
//               </p>
//               <h4 className="text-4xl font-bold text-green-500">
//                 99.98
//                 <span className="text-lg font-normal opacity-60 text-white/60">
//                   %
//                 </span>
//               </h4>
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer
//         className="max-w-7xl mx-auto mt-12 py-6 border-t flex justify-between items-center text-xs"
//         style={{ borderColor: theme.border, color: theme.textSecondary }}
//       >
//         <p>© 2026 RT Sports Manager Monitoring Panel - Admin Controller</p>
//         <p>V 2.4.0-stable</p>
//       </footer>
//     </div>
//   );
// };

// const MetricCard: React.FC<MetricCardProps> = ({
//   title,
//   value,
//   icon,
//   trend,
//   trendUp,
//   theme,
// }) => (
//   <div
//     className="rounded-xl p-5 border transition-all hover:scale-[1.02]"
//     style={{ backgroundColor: theme.paper, borderColor: theme.border }}
//   >
//     <div className="flex justify-between items-start mb-4">
//       <div
//         className="p-2 rounded-lg bg-white/5 border"
//         style={{ borderColor: theme.border }}
//       >
//         {icon}
//       </div>
//       {trend && (
//         <div
//           className={`flex items-center text-xs font-bold ${trendUp ? "text-green-400" : "text-red-400"}`}
//         >
//           {trend}
//           {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
//         </div>
//       )}
//     </div>
//     <div>
//       <p
//         className="text-sm font-medium mb-1"
//         style={{ color: theme.textSecondary }}
//       >
//         {title}
//       </p>
//       <h3 className="text-2xl font-bold">{value}</h3>
//     </div>
//   </div>
// );

// export default App;
