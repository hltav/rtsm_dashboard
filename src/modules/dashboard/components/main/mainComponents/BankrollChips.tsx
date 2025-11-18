"use client";
import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import { formatCurrency } from "@/utils/formatCurrency";

interface BankrollChipsProps {
  bankrolls: BankrollDto[];
}

const BankrollChips: React.FC<BankrollChipsProps> = ({ bankrolls }) => {
  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Saldo por Banca
        </Typography>

        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
          {bankrolls && bankrolls.length > 0 ? (
            bankrolls.map((bank: BankrollDto) => {
              const isPositive = bank.balance >= bank.initialBalance;

              const chipColor = isPositive ? "success" : "error";

              const customColor = isPositive ? "#17ad1a" : undefined;

              return (
                <Chip
                  key={bank.id}
                  label={`${bank.name}: ${formatCurrency(bank.balance)}`}
                  color={chipColor}
                  variant="outlined"
                  sx={{
                    p: 1,

                    color: customColor,

                    borderColor: customColor,
                  }}
                />
              );
            })
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhuma banca cadastrada
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BankrollChips;
