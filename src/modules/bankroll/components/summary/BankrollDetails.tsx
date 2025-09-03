import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { BankrollDto } from '@/modules/bankroll/schema/bankroll.schema';

interface BankrollDetailsProps {
  bankrolls: BankrollDto[];
}

const BankrollDetails: React.FC<BankrollDetailsProps> = ({ bankrolls }) => {
  const totalBalance = bankrolls.reduce((sum, b) => sum + Number(b.balance), 0);
  const totalUnits = bankrolls.reduce((sum, b) => sum + (Number(b.balance) / Number(b.unidValue)), 0);

  return (
    <Box sx={{ minWidth: 250, p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Detalhes da Banca
      </Typography>
      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Saldo Total: <span style={{ color: 'green' }}>${totalBalance.toFixed(2)}</span>
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Unidades Totais: <span style={{ color: 'white' }}>{totalUnits.toFixed(2)} Unid</span>
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {bankrolls.map((bankroll) => (
        <Box key={bankroll.id} sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {bankroll.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Saldo: ${Number(bankroll.balance).toFixed(2)} | Unid: {(Number(bankroll.balance) / Number(bankroll.unidValue)).toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BankrollDetails;