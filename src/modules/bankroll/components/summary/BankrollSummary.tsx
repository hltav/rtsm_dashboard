import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface BankrollSummaryProps {
  totalBalance: number;
  profitPercentage: number;
}

const BankrollSummary: React.FC<BankrollSummaryProps> = ({
  totalBalance,
  profitPercentage,
}) => {
  const isProfit = profitPercentage >= 0;
  const percentageColor = isProfit ? "success.main" : "error.main";
  const ArrowIcon = isProfit ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

  return (
    <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <IconButton color="inherit" aria-label="bankroll summary">
        <AttachMoneyIcon />
      </IconButton>
      <Box sx={{ ml: 1, display: "flex", alignItems: "flex-start" }}>
        <Box>
          <Typography
            variant="caption"
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            Saldo Total
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {`R$ ${totalBalance.toFixed(2)}`}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowIcon sx={{ fontSize: "small", color: percentageColor }} />
          <Typography
            variant="caption"
            sx={{ color: percentageColor, ml: 0.5 }}
          >
            {`${profitPercentage.toFixed(2)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BankrollSummary;
