import React from "react";
import { Typography } from "@mui/material";

interface LoginFormTitleProps {
  title: string;
}

const LoginFormTitle: React.FC<LoginFormTitleProps> = ({ title }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      textAlign="center"
      sx={{ mb: 4, fontWeight: 600 }}
    >
      {title}
    </Typography>
  );
};

export default LoginFormTitle;