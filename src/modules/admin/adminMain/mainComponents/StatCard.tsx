import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { StatCardProps } from "../../props/statCard.props";

export const StatCard = ({ title, value, change, color }: StatCardProps) => (
  <Paper
    sx={{
      p: 3,
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <Typography variant="body2" color="text.secondary" gutterBottom>
      {title}
    </Typography>

    <Typography variant="h4" sx={{ mb: 1 }}>
      {value}
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TrendingUpIcon
        sx={{
          fontSize: 18,
          color: color === "success" ? "success.main" : "error.main",
        }}
      />
      <Typography
        variant="caption"
        sx={{
          ml: 0.5,
          color: color === "success" ? "success.main" : "error.main",
          fontWeight: 700,
        }}
      >
        {change}
      </Typography>
      <Typography variant="caption" sx={{ ml: 1 }}>
        vs. mês passado
      </Typography>
    </Box>
  </Paper>
);
