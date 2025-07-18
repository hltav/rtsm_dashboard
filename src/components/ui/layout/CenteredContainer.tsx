import { Box, BoxProps } from "@mui/material";

export const CenteredContainer = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: { xs: 2, sm: 4, md: 6 },
        backgroundImage: "linear-gradient(135deg, #1A2B42 0%, #0A1B2C 100%)",
        color: "white",
        gap: 2,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
