'use client';
import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import Header from '@/components/home/Header';
import MobileMenu from '@/components/home/MobileMenu';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorks from '@/components/home/HowItWorks';
import CtaSection from '@/components/home/CtaSection';
import Footer from '@/components/home/Footer';
import { ThemeRegistry } from '@/components/Providers/ThemeRegistry';

export default function HomePageContent() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeRegistry>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onMenuToggle={handleMenuToggle} />
        
        {/* Drawer para menu mobile */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleMenuToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              bgcolor: 'primary.main',
              boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <MobileMenu />
        </Drawer>

        {/* Seções da página */}
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <CtaSection />
        <Footer />
      </Box>
    </ThemeRegistry>
  );
}