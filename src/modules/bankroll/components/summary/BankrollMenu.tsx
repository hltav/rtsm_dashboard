import React, { useState, useEffect } from 'react';
import { Box, Popover, CircularProgress } from '@mui/material';
import BankrollSummary from './BankrollSummary';
import BankrollDetails from './BankrollDetails';
import { useAuth } from '@/components/Providers/AuthContext';
import { getBankrolls } from '@/lib/api/bankroll/methodsApiBankroll';
import { BankrollDto } from '@/modules/bankroll/schema/bankroll.schema';

const BankrollMenu: React.FC = () => {
  const { user } = useAuth();
  const [bankrolls, setBankrolls] = useState<BankrollDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const fetchBankrolls = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await getBankrolls(user.id);
        setBankrolls(data);
      } catch (error) {
        console.error('Failed to fetch bankrolls:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBankrolls();
  }, [user]);

  const totalBalance = bankrolls.reduce((sum, b) => sum + Number(b.balance), 0);
  // Defina a lógica para calcular a porcentagem de lucro/prejuízo
  const profitPercentage = 15; // Exemplo de valor

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
          <BankrollSummary
            totalBalance={totalBalance}
            profitPercentage={profitPercentage}
          />
        </Box>
      )}
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
      >
        <BankrollDetails bankrolls={bankrolls} />
      </Popover>
    </Box>
  );
};

export default BankrollMenu;