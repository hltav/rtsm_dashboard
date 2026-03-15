// "use client";
// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// interface DashboardContextType {
//   selectedPage: string;
//   setSelectedPage: (key: string) => void;
// }

// const DashboardContext = createContext<DashboardContextType | undefined>(
//   undefined
// );

// export const DashboardProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const initialPage = searchParams.get("page") || "main";
//   const [selectedPage, setSelectedPage] = useState(initialPage);

//   const setSelectedPageWithUrl = (key: string) => {
//     setSelectedPage(key);
//     router.push(`/dashboard?page=${key}`, { scroll: false });
//   };

//   useEffect(() => {
//     const page = searchParams.get("page") || "main";
//     setSelectedPage(page);
//   }, [searchParams]);

//   return (
//     <DashboardContext.Provider
//       value={{ selectedPage, setSelectedPage: setSelectedPageWithUrl }}
//     >
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export const useDashboard = () => {
//   const context = useContext(DashboardContext);
//   if (!context) {
//     throw new Error(
//       "useDashboard deve ser usado dentro de um DashboardProvider"
//     );
//   }
//   return context;
// };

// "use client";
// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
//   useMemo,
// } from "react";
// import { usePathname, useRouter } from "next/navigation";

// interface DashboardContextType {
//   selectedPage: DashboardPage;
//   setSelectedPage: (key: DashboardPage) => void;
// }

// const DashboardContext = createContext<DashboardContextType | undefined>(
//   undefined,
// );

// const DEFAULT_PAGE = "main";

// type DashboardPage = "main" | "events" | "profile" | "bankrolls";

// const isDashboardPage = (value: string): value is DashboardPage => {
//   return (
//     value === "main" ||
//     value === "events" ||
//     value === "profile" ||
//     value === "bankrolls"
//   );
// };

// const defaultTabByPage: Partial<Record<DashboardPage, string>> = {
//   main: "overview",
//   events: "pending",
// };

// const getPageFromPath = (pathname: string): DashboardPage => {
//   const segments = pathname.split("/").filter(Boolean);

//   const page = segments[1];

//   if (segments[0] === "dashboard" && page && isDashboardPage(page)) {
//     return page;
//   }

//   return DEFAULT_PAGE;
// };
// const buildDashboardRoute = (page: DashboardPage): string => {
//   const defaultTab = defaultTabByPage[page];
//   return defaultTab ? `/dashboard/${page}/${defaultTab}` : `/dashboard/${page}`;
// };

// export const DashboardProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const currentPage = useMemo(() => getPageFromPath(pathname), [pathname]);
//   const [selectedPage, setSelectedPage] = useState<DashboardPage>(
//     currentPage as DashboardPage,
//   );

//   const setSelectedPageWithUrl = (key: DashboardPage) => {
//     setSelectedPage(key);
//     router.push(buildDashboardRoute(key), { scroll: false });
//   };

//   useEffect(() => {
//     setSelectedPage(currentPage);
//   }, [currentPage]);

//   return (
//     <DashboardContext.Provider
//       value={{ selectedPage, setSelectedPage: setSelectedPageWithUrl }}
//     >
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export const useDashboard = () => {
//   const context = useContext(DashboardContext);
//   if (!context) {
//     throw new Error(
//       "useDashboard deve ser usado dentro de um DashboardProvider",
//     );
//   }
//   return context;
// };
