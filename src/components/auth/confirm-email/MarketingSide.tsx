"use client";
import { Typography } from "@mui/material";
import LogoImage from "../../ui/images/LogoImage";
import { CenteredContainer } from "../../ui/layout/CenteredContainer";

interface MarketingSideProps {
  isInvalid?: boolean;
}

export const MarketingSide = ({ isInvalid }: MarketingSideProps) => {
  return (
    <CenteredContainer>
      <LogoImage
        sx={{
          maxWidth: "80%",
          mb: 3,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        }}
      />
      {isInvalid ? (
        // Conteúdo para o caso de FALHA
        <>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ fontWeight: 700, color: "error.main" }} // Cor vermelha para indicar erro
          >
            Algo deu errado...
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ opacity: 0.9 }}>
            Não foi possível verificar sua conta. Por favor, tente novamente
            mais tarde ou entre em contato com o suporte se o problema
            persistir.
          </Typography>
        </>
      ) : (
        // Conteúdo para o caso de SUCESSO 
        <>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Bem-vindo ao <span translate="no">RT Sports Manager</span>!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Sua conta foi ativada com sucesso. Prepare-se para otimizar suas
            análises de apostas!
          </Typography>
        </>
      )}
    </CenteredContainer>
  );
};
