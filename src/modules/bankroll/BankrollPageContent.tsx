"use client";
import React, { useState } from "react";
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
import { useNotification } from "@/components/Providers/NotificationSnackbar";
import {
  useBankrolls,
  useCreateBankroll,
  useDeleteBankroll,
} from "@/modules/bankroll/hook/useBankrolls";
import { AlertConfirmDialog } from "@/utils/AlertConfirmDialog";
import BankrollEditModal from "./components/BankrollEditModal";
import BankrollInfoModal from "./components/BankrollInfoModal";
import { BankrollFormModal } from "./components/BankrollFormModal";

// Definimos um tipo local para o formulário de criação (sem IDs)
type CreateFormData = Omit<BankrollDto, "id" | "userId">;

const BankrollPageContent = () => {
  const { showNotification } = useNotification();
  const { mode } = useThemeMode();

  // Estados para modais
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // Limpeza: removido userId do estado inicial
  const [newBankroll, setNewBankroll] = useState<CreateFormData>({
    name: "",
    balance: 0,
    initialBalance: 0,
    unidValue: 0,
    bookmaker: "",
  });

  // Banca selecionada
  const [selectedBankroll, setSelectedBankroll] = useState<BankrollDto | null>(
    null,
  );
  const [bankrollIdToDelete, setBankrollIdToDelete] = useState<number | null>(
    null,
  );

  /** * Limpeza nos Hooks:
   * Agora os hooks não recebem mais o userId.
   * Eles usarão internamente o bankrollApi que já pega tudo via Cookie.
   */
  const { data: bankrolls = [], isLoading: loading } = useBankrolls();
  const createBankroll = useCreateBankroll();
  const deleteBankroll = useDeleteBankroll();

  // Handlers para edição e detalhes
  const handleEditClick = (bankroll: BankrollDto) => {
    setSelectedBankroll(bankroll);
    setEditOpen(true);
  };

  const handleViewDetailsClick = (bankroll: BankrollDto) => {
    setSelectedBankroll(bankroll);
    setInfoOpen(true);
  };

  // Handlers para criação
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleBankrollSaved = async (savedData: CreateFormData) => {
    try {
      await createBankroll.mutateAsync(savedData);
      showNotification("Banca criada com sucesso!", "success", 2000);
      setOpenCreateModal(false);
      // Opcional: Resetar o formulário
      setNewBankroll({ name: "", balance: 0,initialBalance: 0,  unidValue: 0, bookmaker: "" });
    } catch {
      showNotification("Erro ao criar banca. Tente novamente!", "error", 3000);
    }
  };

  const handleNewBankrollChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewBankroll((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handlers para deleção
  const handleDeleteClick = (id: number) => {
    setBankrollIdToDelete(id);
    setAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setAlertOpen(false);
    if (!bankrollIdToDelete) return;

    try {
      // Convertendo para number caso seu hook espere number
      await deleteBankroll.mutateAsync(bankrollIdToDelete);
      showNotification("Banca deletada com sucesso!", "success", 2000);
    } catch {
      showNotification("Erro ao deletar a banca.", "error", 3000);
    } finally {
      setBankrollIdToDelete(null);
    }
  };

  return (
    <div className={mode === "dark" ? "dark-mode-styles" : "light-mode-styles"}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.default",
          p: 2,
          width: "100%",
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 4,
            }}
          >
            <Typography variant="h5" component="h1">
              Minhas Bancas
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={handleOpenCreateModal}
            >
              Nova Banca
            </Button>
          </Box>

          <Grid container spacing={2}>
            {loading ? (
              <Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
                Carregando bancas...
              </Box>
            ) : bankrolls.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
                Você ainda não possui bancas.
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
                >
                  <BankrollCard
                    bankroll={bankroll}
                    onEdit={() => handleEditClick(bankroll)}
                    onViewDetails={() => handleViewDetailsClick(bankroll)}
                    onDelete={() => handleDeleteClick(bankroll.id)}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>

      <BankrollFormModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        bankroll={newBankroll} // Cast temporário se o componente pedir DTO completo
        onChange={handleNewBankrollChange}
        onSave={handleBankrollSaved}
      />

      {selectedBankroll && (
        <>
          <BankrollEditModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            bankroll={selectedBankroll}
          />
          <BankrollInfoModal
            open={infoOpen}
            onClose={() => setInfoOpen(false)}
            bankrollModal={selectedBankroll}
          />
        </>
      )}

      <AlertConfirmDialog
        open={alertOpen}
        title="Atenção"
        message="Ao deletar essa banca todos os eventos ligados a ela também serão deletados. Deseja Continuar?"
        severity="error"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default BankrollPageContent;
