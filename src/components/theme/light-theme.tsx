import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1A2B42",
      light: "#3A4B62",
      dark: "#0A1B2C",
      contrastText: "#fff",
    },
    secondary: {
      main: "#E0A800",
      light: "#FFC83D",
      dark: "#B38600",
      contrastText: "#000",
    },
    background: {
      default: "#f4f6f8",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif", // Usando Inter como fonte padrão
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontSize: "2.8rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontSize: "2.2rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "1.8rem",
      },
    },
    h4: {
      fontSize: "1.8rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1.2rem",
      },
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Borda arredondada para botões
          textTransform: "none", // Manter o texto normal (não maiúsculas)
        },
      },
    },
    MuiPaper: {
      // Adicionado estilo para Paper
      styleOverrides: {
        root: {
          borderRadius: 12, // Borda arredondada para o Paper (usado no formulário)
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)", // Sombra suave
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8, // Borda arredondada para campos de texto
          },
        },
      },
    },
  },
});
