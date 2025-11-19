"use client";
import React from "react";
import { Card, Typography, Box } from "@mui/material";

export interface MetricCardProps {
  title: string;
  value: number | string;
  color: string; 
  isCurrency?: boolean;
  subText?: string;
  valueColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  color,
  isCurrency = true,
  subText = "",
  valueColor,
}) => {
  const displayColor = valueColor || color;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        p: 1.5,
        bgcolor: "#1A2B41",
        borderRadius: 2,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.7)" }}
          gutterBottom
        >
          {title}
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ color: displayColor }}>
          {isCurrency
            ? value
            : `${value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}%`}
        </Typography>

        {subText && (
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
            {subText}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default MetricCard;
