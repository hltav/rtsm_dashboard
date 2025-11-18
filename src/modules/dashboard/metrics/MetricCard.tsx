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
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {/* Título */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        {/* Valor principal usa a displayColor */}
        <Typography variant="h5" fontWeight="bold" sx={{ color: displayColor }}>
          {isCurrency
            ? value
            : `${value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}%`}
        </Typography>

        {/* SubTexto */}
        {subText && (
          <Typography variant="caption" color="text.disabled">
            {subText}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default MetricCard;
