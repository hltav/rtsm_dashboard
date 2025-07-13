'use client'
import React from 'react';
import { Box, Typography, Link, IconButton, Container } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'grey.900', color: 'white', py: { xs: 2, md: 4 }, textAlign: 'center' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Termos de Uso
          </Link>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Política de Privacidade
          </Link>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Contato
          </Link>
        </Box>
        <Box sx={{ mb: 2 }}>
          <IconButton color="inherit" aria-label="Facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Twitter">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Instagram">
            <InstagramIcon />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary">
          © 2025 RT Sports Manager. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;