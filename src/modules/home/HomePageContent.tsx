"use client";
import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileMenu from "@/modules/home/components/MobileMenu";
import HeroSection from "@/modules/home/components/HeroSection";
import FeaturesSection from "@/modules/home/components/FeaturesSection";
import HowItWorks from "@/modules/home/components/HowItWorks";
import CtaSection from "@/modules/home/components/CtaSection";
import Footer from "@/modules/home/components/Footer";
import Header from "./components/Header";
import LearnMore from "./components/LearnMore";

export default function HomePageContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      id="top"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Header onMenuToggle={handleMenuToggle} />

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleMenuToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: theme.palette.primary.main,
          },
        }}
      >
        <MobileMenu />
      </Drawer>
      <HeroSection />
      <section id="features-section">
        <FeaturesSection />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="learn-more">
        <LearnMore />
      </section>
      <section id="cta-section">
        <CtaSection />
      </section>
      <Footer />
    </Box>
  );
}
