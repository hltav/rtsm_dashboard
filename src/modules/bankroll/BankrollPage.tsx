"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { getBankrolls } from "@/lib/api/bankroll/methodsApiBankroll";

const BankrollPage = () => {
  const { user } = useAuth();
  const [bankrolls, setBankrolls] = useState<BankrollDto[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newBankroll, setNewBankroll] = useState({
    name: "",
    balance: "",
    unidValue: "",
    bookmaker: "",
  });

  const { mode } = useThemeMode();

  const loadBankrolls = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getBankrolls(user.id);
      setBankrolls(data);
    } catch (err) {
      console.error("Erro ao carregar bancas:", err);
      setError("Erro ao carregar as bancas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadBankrolls();
    }
  }, [user, loadBankrolls]);

  const handleEditClick = (id: string) => {
    console.log("Editar banca:", id);
  };

  const handleViewDetailsClick = (id: string) => {
    console.log("Ver detalhes da banca:", id);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);

    setNewBankroll({ name: "", balance: "", unidValue: "", bookmaker: "" });
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

  const handleSaveNewBankroll = async () => {
    if (!user) {
      console.error(
        "Erro: Usuário não autenticado. Por favor, faça login novamente."
      );
      setError(
        "Não foi possível salvar a banca. Por favor, faça login novamente."
      );
      return;
    }

    const balanceNum = parseFloat(newBankroll.balance);
    const unidValueNum = parseFloat(newBankroll.unidValue);

    if (isNaN(balanceNum) || isNaN(unidValueNum) || unidValueNum === 0) {
      console.error(
        "Saldo e Valor por Unid devem ser números válidos e Valor por Unid não pode ser zero."
      );
      return;
    }

    try {
      console.log("Saving new bankroll to the database:", newBankroll);

      const newId = Date.now().toString();
      setBankrolls((prev) => [
        ...prev,
        {
          id: newId,
          name: newBankroll.name,
          balance: balanceNum,
          unidValue: unidValueNum,
          bookmaker: newBankroll.bookmaker,
          userId: user.id,
        },
      ]);
    } catch (err) {
      console.error("Erro ao salvar nova banca:", err);
      setError("Erro ao salvar a nova banca. Tente novamente.");
    }

    handleCloseModal();
  };

  const handleRefresh = () => {
    loadBankrolls();
  };

  if (loading) {
    return <div>Carregando bancas...</div>;
  }

 
  if (error) {
   
    if (error.includes("No bankroll found for this user")) {
      return (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <p>
            Você ainda não possui bancas. Crie sua primeira banca para começar.
          </p>
        </Box>
      );
    } else {
      
      return (
        <div>
          <p>Erro ao carregar bancas: {error}</p>
          <button onClick={handleRefresh}>Tentar novamente</button>
        </div>
      );
    }
  }

  
  if (bankrolls.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <p>
          Você ainda não possui bancas. Crie sua primeira banca para começar.
        </p>
      </Box>
    );
  }

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
          p: { xs: 2, sm: 3, md: 4 },
          width: "100%",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            py: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100vh",
              mb: 4,
              mt: { xs: "7%", sm: "2%", md: "2%" },
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 0,
                color: "text.primary",
                transition: "color 0.3s ease",
              }}
            >
              Minhas Bancas
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleOpenModal}
              >
                Nova Banca
              </Button>
            </Box>
          </Box>
          <Grid
            container
            spacing={4}
            justifyContent="flex-start"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {bankrolls.map((bankroll) => (
              <Grid item xs={12} sm={6} md={4} key={bankroll.id}>
                <BankrollCard
                  bankroll={bankroll}
                  onEdit={handleEditClick}
                  onViewDetails={handleViewDetailsClick}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <BankrollFormModal
        open={openModal}
        onClose={handleCloseModal}
        bankroll={newBankroll}
        onChange={handleNewBankrollChange}
        onSave={handleSaveNewBankroll}
      />
    </div>
  );
};

export default BankrollPage;
