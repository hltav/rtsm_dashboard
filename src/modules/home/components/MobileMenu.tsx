'use client';
import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import Link from 'next/link';

const MobileMenu: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.main', height: '100%' }}>
      <Box sx={{ my: 3 }}>
       
      </Box>
      <Divider sx={{ mb: 2, bgcolor: 'primary.light' }} />
      <List>
        {['Início', 'Recursos', 'Como Funciona'].map((item) => (
          <ListItemButton key={item} sx={{ textAlign: 'center', py: 1.5, '&:hover': { bgcolor: 'primary.dark' } }}>
            <ListItemText primary={item} sx={{ color: 'white', fontWeight: 600 }} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ my: 2, bgcolor: 'primary.light' }} />
      <List>
        <ListItemButton LinkComponent={Link} href="/register" sx={{ textAlign: 'center', py: 1.5, '&:hover': { bgcolor: 'primary.dark' } }}>
          <ListItemText primary="Cadastre-se" sx={{ color: 'secondary.light', fontWeight: 700 }} />
        </ListItemButton>
        <ListItemButton LinkComponent={Link} href="/login" sx={{ textAlign: 'center', py: 1.5, '&:hover': { bgcolor: 'primary.dark' } }}>
          <ListItemText primary="Login" sx={{ color: 'secondary.main', fontWeight: 700 }} />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default MobileMenu;