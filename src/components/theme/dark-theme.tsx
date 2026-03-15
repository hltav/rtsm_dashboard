import { createTheme, alpha } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    // Brand base
    primary: {
      main: "#1A2B42",
      light: "#2A3C58",
      dark: "#0F1B2B",
      contrastText: "#FFFFFF",
    },

    // Accent (amarelo)
    secondary: {
      main: "#FFC83D",
      light: "#FFFFFF",
      dark: "#E0A800",
      contrastText: "#0F1B2B",
    },

    // Background / surfaces
    background: {
      default: "#071527",
      paper: "#0C1F35",
    },

    // Extra surfaces (cards, headers, etc.)
    surface: {
      1: "#0B1A2E",
      2: "#0E223B",
      3: "#132A46",
    },

    divider: alpha("#FFFFFF", 0.1),

    text: {
      primary: alpha("#FFFFFF", 0.92),
      secondary: alpha("#FFFFFF", 0.68),
      tertiary: alpha("#FFFFFF", 0.85),
    },

    action: {
      hover: alpha("#FFFFFF", 0.06),
      selected: alpha("#FFC83D", 0.22), // bom p/ tabs selecionadas
      disabled: alpha("#FFFFFF", 0.38),
      disabledBackground: alpha("#FFFFFF", 0.08),
      focus: alpha("#FFC83D", 0.18),
    },

    // Estados (opcional, mas ajuda MUITO na consistência)
    error: { main: "#FF5A6A" },
    warning: { main: "#FFB020" },
    info: { main: "#4DA3FF" },
    success: { main: "#34D399" },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      "@media (max-width:600px)": { fontSize: "2.5rem" },
    },
    h2: {
      fontSize: "2.8rem",
      fontWeight: 600,
      "@media (max-width:600px)": { fontSize: "2rem" },
    },
    h3: {
      fontSize: "2.2rem",
      fontWeight: 600,
      "@media (max-width:600px)": { fontSize: "1.8rem" },
    },
    h4: {
      fontSize: "1.8rem",
      fontWeight: 600,
      "@media (max-width:600px)": { fontSize: "1.5rem" },
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      "@media (max-width:600px)": { fontSize: "1.2rem" },
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
      "@media (max-width:600px)": { fontSize: "1rem" },
    },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, textTransform: "none", fontWeight: 600 },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundImage: "none", // evita “tint” automático no dark
          border: `1px solid ${alpha("#FFFFFF", 0.08)}`,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha("#FFFFFF", 0.22),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha("#FFC83D", 0.9),
            borderWidth: 1,
          },
        },
        notchedOutline: {
          borderColor: alpha("#FFFFFF", 0.14),
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: alpha("#FFFFFF", 0.7),
          "&.Mui-focused": { color: alpha("#FFFFFF", 0.92) },
        },
      },
    },
  },
});
