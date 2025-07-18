import React from "react";
import { Typography } from "@mui/material";
import LogoImage from "../ui/images/LogoImage";
import { CenteredContainer } from "../ui/layout/CenteredContainer";

const RegisterMarketing: React.FC = () => {
  return (
    <CenteredContainer>
      {" "}
      <LogoImage />
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Junte-se ao <span translate="no">RT Sports Manager</span>!
      </Typography>
      <Typography variant="h6" component="p" sx={{ opacity: 0.9, mb: 2 }}>
        Comece a analisar suas apostas e aprimore suas estratégias.
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "400px", opacity: 0.8 }}>
        Gerencie seus palpites, entenda seus resultados e evolua como apostador,
        sem riscos reais.
      </Typography>
    </CenteredContainer>
  );
};

export default RegisterMarketing;
