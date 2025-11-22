import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1A2B42",
      light: "#5A6B82",
      dark: "#1A2B42",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFC83D",
      light: "#FFD86B",
      dark: "#E0A800",
      contrastText: "#fff",
    },
    background: {
      default: "#121212",
      paper: "#1A2B42",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B0B0B0",
      tertiary: "#fff",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
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
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.6)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
            borderWidth: 1,
          },
        },
        notchedOutline: {
          borderColor: "rgba(255, 255, 255, 0.3)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.7)",
          "&.Mui-focused": {
            color: "#fff",
          },
        },
      },
    },
  },
});
