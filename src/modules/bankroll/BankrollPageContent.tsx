"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import { BankrollDto } from "./schema/bankroll.schema";
import { BankrollCard } from "./components/BankrollCard";
import { useThemeMode } from "@/components/Providers/ThemeRegistry";
import { BankrollFormModal } from "./components/BankrollFormModal";
import { useAuth } from "@/components/Providers/AuthContext";
import { CreateBankrollDto } from "./schema/createBankroll.schema";
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import { useBankrolls, useCreateBankroll } from "@/hooks/useBankrolls";

const BankrollPageContent = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [newBankroll, setNewBankroll] = useState<CreateBankrollDto>({
    userId: user?.id ?? 0,
    name: "",
    balance: 0,
    unidValue: 0,
    bookmaker: "",
  });
  const { showNotification } = useNotification();
  const { mode } = useThemeMode();

  const {
    data: bankrolls = [],
    isLoading: loading,
    isError,
    error: queryError,
  } = useBankrolls(user?.id ?? 0);

  const createBankroll = useCreateBankroll(user?.id ?? 0);

  useEffect(() => {
    if (isError && queryError) {
      const apiError = queryError as { status?: number; statusCode?: number };
      if (apiError.status === 404 || apiError.statusCode === 404) {
        showNotification(
          "Você ainda não possui uma banca registrada. Registre e comece a aproveitar!",
          "warning",
          3000
        );
      } else {
        showNotification(
          "Ops. Aconteceu algo estranho. Recarregue a página e tente novamente!",
          "error",
          3000
        );
      }
    }
  }, [isError, queryError, showNotification]);

  const handleEditClick = (id: number) => {
    console.log("Editar banca:", id);
  };

  const handleViewDetailsClick = (id: number) => {
    console.log("Ver detalhes da banca:", id);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewBankroll({
      userId: user?.id ?? 0,
      name: "",
      balance: 0,
      unidValue: 0,
      bookmaker: "",
    });
  };

  const handleBankrollSaved = async (
    savedBankroll: Omit<BankrollDto, "id" | "userId">
  ) => {
    try {
      await createBankroll.mutateAsync(savedBankroll);
      showNotification("Banca criada com sucesso!", "success", 2000);
      setOpenModal(false);
      setNewBankroll({
        userId: user?.id ?? 0,
        name: "",
        balance: 0,
        unidValue: 0,
        bookmaker: "",
      });
    } catch {
      showNotification("Erro ao criar banca. Tente novamente!", "error", 3000);
    }
  };

  const handleNewBankrollChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewBankroll((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={mode === "dark" ? "dark-mode-styles" : "light-mode-styles"}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          bgcolor: "background.default",
          p: { xs: 2, sm: 3, md: 2 },
          width: "100%",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            py: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              width: "100%",
              mb: 4,
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: { xs: 0, sm: 0 },
                color: "text.primary",
                transition: "color 0.3s ease",
              }}
            >
              Minhas Bancas
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleOpenModal}
              sx={{
                flexShrink: 0,
              }}
            >
              Nova Banca
            </Button>
          </Box>

          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            sx={{ width: "100%" }}
          >
            {loading ? (
              <Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
                <p>Carregando bancas...</p>
              </Box>
            ) : isError ? (
              <Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
                <p>
                  Você ainda não possui bancas. Crie sua primeira banca para
                  começar.
                </p>
              </Box>
            ) : bankrolls.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
                <p>
                  Você ainda não possui bancas. Crie sua primeira banca para
                  começar.
                </p>
              </Box>
            ) : (
              bankrolls.map((bankroll) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={2.5}
                  key={bankroll.id}
                  sx={{ p: { sm: 0 } }}
                >
                  <BankrollCard
                    bankroll={bankroll}
                    onEdit={handleEditClick}
                    onViewDetails={handleViewDetailsClick}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>
      <BankrollFormModal
        open={openModal}
        onClose={handleCloseModal}
        bankroll={newBankroll}
        onChange={handleNewBankrollChange}
        onSave={handleBankrollSaved}
      />
    </div>
  );
};

export default BankrollPageContent;
