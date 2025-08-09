"use client";
import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import MobileMenu from "@/modules/home/components/MobileMenu";
import HeroSection from "@/modules/home/components/HeroSection";
import FeaturesSection from "@/modules/home/components/FeaturesSection";
import HowItWorks from "@/modules/home/components/HowItWorks";
import CtaSection from "@/modules/home/components/CtaSection";
import Footer from "@/modules/home/components/Footer";
import { ThemeRegistry } from "@/components/Providers/ThemeRegistry";
import Header from "./components/Header";

export default function HomePageContent() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeRegistry>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header onMenuToggle={handleMenuToggle} />

        {/* Drawer para menu mobile */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleMenuToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              bgcolor: "primary.main",
              boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.4)",
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
