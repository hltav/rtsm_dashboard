import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeText {
    tertiary?: string;
  }

  interface Palette {
    surface?: {
      1: string;
      2: string;
      3: string;
    };
  }
  interface PaletteOptions {
    surface?: {
      1: string;
      2: string;
      3: string;
    };
  }
}
