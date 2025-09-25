// "use client";
// import { useState, useEffect } from "react";

// export const useSystemTheme = (): "light" | "dark" => {
//   const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

//   useEffect(() => {
//     const detectSystemTheme = () => {
//       if (typeof window !== "undefined" && window.matchMedia) {
//         const isDark = window.matchMedia(
//           "(prefers-color-scheme: dark)"
//         ).matches;
//         return isDark ? "dark" : "light";
//       }
//       return "light";
//     };

//     setSystemTheme(detectSystemTheme());

//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

//     const handleChange = (e: MediaQueryListEvent) => {
//       setSystemTheme(e.matches ? "dark" : "light");
//     };

//     if (mediaQuery.addEventListener) {
//       mediaQuery.addEventListener("change", handleChange);
//     } else {
//       mediaQuery.addListener(handleChange);
//     }

//     return () => {
//       if (mediaQuery.removeEventListener) {
//         mediaQuery.removeEventListener("change", handleChange);
//       } else {
//         mediaQuery.removeListener(handleChange);
//       }
//     };
//   }, []);

//   return systemTheme;
// };

"use client";
import { useState, useEffect } from "react";

export const useSystemTheme = (): "light" | "dark" => {
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Verifica se está no cliente
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const detectSystemTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "dark" : "light";
    };

    setSystemTheme(detectSystemTheme());

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return systemTheme;
};
