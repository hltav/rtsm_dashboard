// import React, { useState, useEffect } from "react";
// import { Box, Popover, CircularProgress } from "@mui/material";
// import BankrollSummary from "./BankrollSummary";
// import BankrollDetails from "./BankrollDetails";
// import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";
// import { useAuth } from "@/components/Providers/AuthContext";
// import { BankrollDto } from "../../schema/bankroll.schema";

// const BankrollMenu: React.FC = () => {
//   const { user } = useAuth();
//   const [bankrolls, setBankrolls] = useState<BankrollDto[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

//   useEffect(() => {
//     const fetchBankrolls = async () => {
//       if (!user) {
//         setLoading(false);
//         return;
//       }
//       try {
//         const data = await bankrollApi.getById(bankrolls.bankId);
//         setBankrolls(Array.isArray(data) ? data : [data]);
//       } catch (error) {
//         console.error("Failed to fetch bankrolls:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBankrolls();
//   }, [user]);

//   const totalBalance = bankrolls.reduce((sum, b) => sum + Number(b.balance), 0);

//   const profitPercentage = 15;

//   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <Box>
//       {loading ? (
//         <CircularProgress size={24} />
//       ) : (
//         <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
//           <BankrollSummary
//             totalBalance={totalBalance}
//             profitPercentage={profitPercentage}
//           />
//         </Box>
//       )}
//       <Popover
//         id="mouse-over-popover"
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handlePopoverClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//         disableRestoreFocus
//       >
//         <BankrollDetails bankrolls={bankrolls} />
//       </Popover>
//     </Box>
//   );
// };

// export default BankrollMenu;
import React, { useState, useEffect } from "react";
import { Box, Popover, CircularProgress } from "@mui/material";
import BankrollSummary from "./BankrollSummary";
import BankrollDetails from "./BankrollDetails";
import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";
import { useAuth } from "@/components/Providers/AuthContext";
import { BankrollDto } from "../../schema/bankroll.schema";

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
        // Agora não usamos mais user.id
        const data = await bankrollApi.getAll();
        setBankrolls(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Failed to fetch bankrolls:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBankrolls();
  }, [user]);

  const totalBalance = bankrolls.reduce((sum, b) => sum + Number(b.balance), 0);

  const profitPercentage = 15;

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
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableRestoreFocus
      >
        <BankrollDetails bankrolls={bankrolls} />
      </Popover>
    </Box>
  );
};

export default BankrollMenu;
