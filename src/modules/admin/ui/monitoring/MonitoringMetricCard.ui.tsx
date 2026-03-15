"use client";
import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { MetricCardProps } from "../../props/monitoring/metricCard.props";

const MonitoringMetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
        cursor:"pointer"
      }}
    >
      <CardContent>
        {/* Top Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          {/* Icon Box */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              bgcolor: "action.hover",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>

          {/* Trend */}
          {trend && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: 12,
                fontWeight: "bold",
                color: trendUp ? "#17ad1a" : "#d31717",
              }}
            >
              {trend}
              {trendUp ? (
                <ArrowUpwardIcon sx={{ fontSize: 14 }} />
              ) : (
                <ArrowDownwardIcon sx={{ fontSize: 14 }} />
              )}
            </Box>
          )}
        </Box>

        {/* Bottom Section */}
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5, fontWeight: 500 }}
          >
            {title}
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonitoringMetricCard;
