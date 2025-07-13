import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const CtaSection: React.FC = () => {
  return (
    <Box sx={{
      py: { xs: 4, md: 8 },
      textAlign: 'center',
      backgroundImage: 'linear-gradient(45deg, #0A1B2C 0%, #1A2B42 100%)',
      color: 'white',
    }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Pronto para levar suas análises de apostas para o próximo nível?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            px: 6,
            py: 1.8,
            fontSize: '1.1rem',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
          }}
          LinkComponent="a"
          href="/register"
        >
          Cadastre-se Agora!
        </Button>
      </Container>
    </Box>
  );
};

export default CtaSection;