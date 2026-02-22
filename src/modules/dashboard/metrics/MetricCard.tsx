/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { Card, Typography, Box, useTheme } from "@mui/material";

export interface MetricCardProps {
  title: string;
  value: number | string;
  color: string;
  change?: string;
  isCurrency?: boolean;
  subText?: string;
  valueColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  color,
  change,
  isCurrency = true,
  subText = "",
  valueColor,
}) => {
  const theme = useTheme();
  const displayColor = valueColor || color;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        p: 1.5,
        borderRadius: 2,
        borderLeft: `5px solid ${color}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.primary }}
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
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.disabled }}
          >
            {subText}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default MetricCard;
