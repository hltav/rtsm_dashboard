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
    autoHideDuration?: number,
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [duration, setDuration] = useState(3000);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = useCallback(
    (msg: string, svr: AlertColor, autoHideDuration = 3000) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setMessage(msg);
      setSeverity(svr);
      setDuration(autoHideDuration);
      setOpen(true);

      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, autoHideDuration);
    },
    [],
  );

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(false);
  };

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
          maxWidth: "100%",
          "& .MuiAlert-root": {
            width: "100%",
            fontSize: "1.5rem",
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
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
