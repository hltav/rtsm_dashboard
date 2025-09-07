'use client';
import React, { useState, useRef, useEffect } from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export interface SportEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

interface CustomCarouselProps {
  items: SportEvent[];
  autoPlay?: boolean;
  interval?: number;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  items,
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [itemWidth, setItemWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const updateItemWidth = () => {
    if (itemRefs.current[0]) {
      setItemWidth(itemRefs.current[0].offsetWidth + 16); 
    }
  };

  useEffect(() => {
    updateItemWidth();
    window.addEventListener("resize", updateItemWidth);
    return () => window.removeEventListener("resize", updateItemWidth);
  }, []);

  useEffect(() => {
    let carouselTimer: NodeJS.Timeout;
    if (autoPlay && items.length > 0 && !isHovered) {
      carouselTimer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, interval);
    }
    return () => {
      if (carouselTimer) clearInterval(carouselTimer);
    };
  }, [autoPlay, interval, items.length, isHovered]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  useEffect(() => {
    if (carouselRef.current && itemWidth > 0) {
      carouselRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex, itemWidth]);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        boxShadow: 1,
        py: 1,
      }}
    >
      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          pl: 3,
          pr: 3,
        }}
      >
        {items.map((event, index) => (
          <Paper
            key={event.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            sx={{
              display: "flex",
              height: 70,
              minWidth: { xs: "calc(100% - 48px)", sm: 200, md: 250 },
              mr: 2,
              scrollSnapAlign: "start",
              flexShrink: 0,
              borderRadius: 2,
            }}
          >
            <Box
              component="img"
              sx={{
                width: 60,
                display: { xs: "none", sm: "block" },
                objectFit: "cover",
                borderRadius: "8px 0 0 8px",
              }}
              src={event.imageUrl}
              alt={event.title}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://placehold.co/60x70/cccccc/000000?text=Img";
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                p: 1,
                justifyContent: "center",
              }}
            >
              <Typography
                component="div"
                variant="body2"
                sx={{ fontWeight: "bold" }}
              >
                {event.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {event.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          zIndex: 1,
          p: 0.5,
          ml: 0.5,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {"<"}
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          zIndex: 1,
          p: 0.5,
          mr: 0.5,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {">"}
      </IconButton>
    </Box>
  );
};

export default CustomCarousel;
