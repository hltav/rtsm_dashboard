import { createTheme, alpha } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1A2B42",
      light: "#2E4360",
      dark: "#0A1B2C",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#E0A800",
      light: "#FFC83D",
      dark: "#B38600",
      contrastText: "#1A2B42",
    },

    background: {
      default: "#F6F8FB",
      paper: "#e9e5e5",
    },

    surface: {
      1: "#FFFFFF",
      2: "#F1F4F8",
      3: "#e9e5e5",
    },

    divider: alpha("#0A1B2C", 0.18), // ou 0.2

    text: {
      primary: "#0F1B2B",
      secondary: alpha("#0F1B2B", 0.7),
      tertiary: alpha("#0F1B2B", 0.82),
    },

    action: {
      hover: alpha("#0A1B2C", 0.06),
      selected: alpha("#1A2B42", 0.1),
      disabled: alpha("#0A1B2C", 0.3),
      disabledBackground: alpha("#0A1B2C", 0.06),
      focus: alpha("#1A2B42", 0.14),
    },

    error: { main: "#D92D20" },
    warning: { main: "#DC6803" },
    info: { main: "#1570EF" },
    success: { main: "#12B76A" },
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
          boxShadow: "0px 10px 30px rgba(15, 27, 43, 0.06)",
          border: `1px solid ${alpha("#0A1B2C", 0.12)}`, // era 0.08
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
          },
        },
      },
    },
  },
});
