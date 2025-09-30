// 'use client';
// import React, { createContext, useContext, useState } from 'react';
// import { Alert, AlertColor, Snackbar } from '@mui/material';
// interface NotificationContextType {
//   showNotification: (message: string, severity: AlertColor) => void;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [severity, setSeverity] = useState<AlertColor>('info');

//   const showNotification = (msg: string, svr: AlertColor) => {
//     setMessage(msg);
//     setSeverity(svr);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <NotificationContext.Provider value={{ showNotification }}>
//       {children}
//       <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//         sx={{
//           maxWidth: '80%',
//           '& .MuiAlert-root': {
//             width: '100%',
//             fontSize: '0.875rem',
//           }
//         }}
//       >
//         <Alert
//           severity={severity}
//           onClose={handleClose}
//           sx={{ width: '100%' }}
//         >
//           {message}
//         </Alert>
//       </Snackbar>
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => {
//   const context = useContext(NotificationContext);
//   if (!context) {
//     throw new Error('useNotification must be used within a NotificationProvider');
//   }
//   return context;
// };

"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

interface NotificationContextType {
  showNotification: (
    message: string,
    severity: AlertColor,
    autoHideDuration?: number
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [duration, setDuration] = useState(3000);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCallback(
    (msg: string, svr: AlertColor, autoHideDuration = 3000) => {
      // Limpa timeout anterior se existir
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setMessage(msg);
      setSeverity(svr);
      setDuration(autoHideDuration);
      setOpen(true); // Força o fechamento após o tempo especificado

      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, autoHideDuration);
    },
    [] // O array de dependências está vazio, pois 'timeoutRef' é um useRef // e os setters de estado (setMessage, setOpen, etc.) são estáveis.
  );

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(false);
  };

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          maxWidth: "80%",
          "& .MuiAlert-root": {
            width: "100%",
            fontSize: "0.875rem",
          },
        }}
      >
        <Alert severity={severity} onClose={handleClose} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
