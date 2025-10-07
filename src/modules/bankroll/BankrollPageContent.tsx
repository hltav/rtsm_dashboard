// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   CssBaseline,
//   Grid,
//   SelectChangeEvent,
// } from "@mui/material";
// import { BankrollDto } from "./schema/bankroll.schema";
// import { BankrollCard } from "./components/BankrollCard";
// import { useThemeMode } from "@/components/Providers/ThemeRegistry";
// import { BankrollFormModal } from "./components/BankrollFormModal";
// import BankrollEditModal from "./components/BankrollEditModal";
// import BankrollInfoModal from "./components/BankrollInfoModal";
// import { useAuth } from "@/components/Providers/AuthContext";
// import { CreateBankrollDto } from "./schema/createBankroll.schema";
// import { useNotification } from "@/components/Providers/NotificationSnackbar";
// import {
//   useBankrolls,
//   useCreateBankroll,
//   useDeleteBankroll,
// } from "@/modules/bankroll/hook/useBankrolls";
// import { BankrollItem } from "./interface/bankrollItem.interface";
// import { AlertConfirmDialog } from "@/utils/AlertConfirmDialog";

// const BankrollPageContent = () => {
//   const { user } = useAuth();
//   const [openModal, setOpenModal] = useState(false);
//   const [newBankroll, setNewBankroll] = useState<CreateBankrollDto>({
//     userId: user?.id ?? 0,
//     name: "",
//     balance: 0,
//     unidValue: 0,
//     bookmaker: "",
//   });
//   const { showNotification } = useNotification();
//   const { mode } = useThemeMode();

//   const {
//     data: bankrolls = [],
//     isLoading: loading,
//     isError,
//     error: queryError,
//   } = useBankrolls(user?.id ?? 0);
//   const createBankroll = useCreateBankroll(user?.id ?? 0);
//   const deleteBankroll = useDeleteBankroll(user?.id ?? 0);
//   const [alertOpen, setAlertOpen] = React.useState(false);

//   const [editOpen, setEditOpen] = useState(false);
//   const [infoOpen, setInfoOpen] = useState(false);
//   const [selectedBankroll, setSelectedBankroll] = useState<BankrollItem | null>(
//     null
//   );
//   const [bankrollIdToDelete, setBankrollIdToDelete] = useState<string | null>(
//     null
//   );

//   const mapDtoToItem = (dto: BankrollDto): BankrollItem => ({
//     id: dto.id,
//     withdrawals: 0,
//     addedBalance: 0,
//     gains: 0,
//     losses: 0,
//     profitAndLoss: 0,
//     result: 0,
//     unidValue: dto.unidValue,
//     editBalance: "" as "" | "withdrawals" | "addedBalance",
//     balance: dto.balance,
//   });

//   const handleEditClick = (bankroll: BankrollDto) => {
//     setSelectedBankroll(mapDtoToItem(bankroll));
//     setEditOpen(true);
//   };

//   const handleViewDetailsClick = (bankroll: BankrollDto) => {
//     setSelectedBankroll(mapDtoToItem(bankroll));
//     setInfoOpen(true);
//   };

//   // const handleEditChange = (
//   //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   // ) => {
//   //   if (!selectedBankroll) return;
//   //   const { name, value } = e.target;
//   //   setSelectedBankroll({ ...selectedBankroll, [name]: value });
//   // };

//   const handleEditChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     if (!selectedBankroll) return;
//     const { name, value } = e.target;
//     const cleanValue = value.replace(/[^\d,.-]/g, "").replace(",", ".");
//     setSelectedBankroll({
//       ...selectedBankroll,
//       [name]: Number(cleanValue) || 0,
//     });
//   };

//   const handleEditSelectChange = (e: SelectChangeEvent<string>) => {
//     if (!selectedBankroll) return;
//     const typedValue = e.target.value as "" | "withdrawals" | "addedBalance";
//     setSelectedBankroll({ ...selectedBankroll, editBalance: typedValue });
//   };

//   const handleSaveEdit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Salvou edição:", selectedBankroll);
//     setEditOpen(false);
//   };

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setNewBankroll({
//       userId: user?.id ?? 0,
//       name: "",
//       balance: 0,
//       unidValue: 0,
//       bookmaker: "",
//     });
//   };

//   const handleBankrollSaved = async (
//     savedBankroll: Omit<BankrollDto, "id" | "userId">
//   ) => {
//     try {
//       console.log("📤 DADOS ENVIADOS:", {
//         balance: savedBankroll.balance,
//         unidValue: savedBankroll.unidValue,
//       });
//       const result = await createBankroll.mutateAsync(savedBankroll);

//       // CONSOLE.LOG DEPOIS DO CREATE - COMPARAÇÃO
//       console.log("🔄 COMPARAÇÃO - ANTES vs DEPOIS:");
//       console.log("💰 Balance:", {
//         Enviado: savedBankroll.balance,
//         Salvo: result.balance,
//         Iguais: savedBankroll.balance === result.balance,
//       });
//       console.log("🎯 UnidValue:", {
//         Enviado: savedBankroll.unidValue,
//         Salvo: result.unidValue,
//         Iguais: savedBankroll.unidValue === result.unidValue,
//       });
//       console.log("✅ Banca criada com ID:", result.id);
//       showNotification("Banca criada com sucesso!", "success", 2000);
//       setOpenModal(false);
//       setNewBankroll({
//         userId: user?.id ?? 0,
//         name: "",
//         balance: 0,
//         unidValue: 0,
//         bookmaker: "",
//       });
//     } catch {
//       showNotification("Erro ao criar banca. Tente novamente!", "error", 3000);
//     }
//   };

//   const handleNewBankrollChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewBankroll((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDeleteClick = (id: string) => {
//     setBankrollIdToDelete(id);
//     setAlertOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     setAlertOpen(false);

//     if (!bankrollIdToDelete) return;

//     try {
//       await deleteBankroll.mutateAsync(bankrollIdToDelete);
//       showNotification("Banca deletada com sucesso!", "success", 2000);
//     } catch {
//       showNotification(
//         "Erro ao deletar a banca. Tente novamente.",
//         "error",
//         3000
//       );
//     } finally {
//       setBankrollIdToDelete(null);
//     }
//   };
//   return (
//     <div className={mode === "dark" ? "dark-mode-styles" : "light-mode-styles"}>
//       <CssBaseline />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           bgcolor: "background.default",
//           p: { xs: 2, sm: 3, md: 2 },
//           width: "100%",
//         }}
//       >
//         <Container maxWidth={false}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: { xs: "flex-start", sm: "center" },
//               width: "100%",
//               mb: 4,
//               gap: { xs: 2, sm: 0 },
//             }}
//           >
//             <Typography variant="h5" component="h1" gutterBottom>
//               Minhas Bancas
//             </Typography>
//             <Button variant="contained" size="small" onClick={handleOpenModal}>
//               Nova Banca
//             </Button>
//           </Box>

//           <Grid container spacing={2} justifyContent="flex-start">
//             {loading ? (
//               <Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
//                 <p>Carregando bancas...</p>
//               </Box>
//             ) : bankrolls.length === 0 ? (
//               <Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
//                 <p>
//                   Você ainda não possui bancas. Crie sua primeira banca para
//                   começar.
//                 </p>
//               </Box>
//             ) : (
//               bankrolls.map((bankroll) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={6}
//                   lg={4}
//                   xl={2.5}
//                   key={bankroll.id}
//                 >
//                   <BankrollCard
//                     bankroll={bankroll}
//                     onEdit={() => handleEditClick(bankroll)}
//                     onViewDetails={() => handleViewDetailsClick(bankroll)}
//                     onDelete={() => handleDeleteClick(bankroll.id.toString())}
//                   />
//                 </Grid>
//               ))
//             )}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Modal de criação */}
//       <BankrollFormModal
//         open={openModal}
//         onClose={handleCloseModal}
//         bankroll={newBankroll}
//         onChange={handleNewBankrollChange}
//         onSave={handleBankrollSaved}
//       />

//       {/* Modal de edição */}
//       {selectedBankroll && (
//         <BankrollEditModal
//           open={editOpen}
//           onClose={() => setEditOpen(false)}
//           bankrollItemModal={selectedBankroll}
//           onChange={handleEditChange}
//           onSelectChange={handleEditSelectChange}
//           onSave={handleSaveEdit}
//         />
//       )}

//       {/* Modal de informações */}
//       {selectedBankroll && (
//         <BankrollInfoModal
//           open={infoOpen}
//           onClose={() => setInfoOpen(false)}
//           bankrollModal={selectedBankroll}
//         />
//       )}
//       <AlertConfirmDialog
//         open={alertOpen}
//         title="Atenção"
//         message="Você tem certeza que deseja deletar esta banca?"
//         severity="error"
//         onConfirm={handleDeleteConfirm}
//         onCancel={() => {
//           setAlertOpen(false);
//           setBankrollIdToDelete(null);
//         }}
//       />
//     </div>
//   );
// };

// export default BankrollPageContent;

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
import { useAuth } from "@/components/Providers/AuthContext";
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
import { CreateBankrollDto } from "./schema/createBankroll.schema";

const BankrollPageContent = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { mode } = useThemeMode();

  // Estados para modais
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [newBankroll, setNewBankroll] = useState<CreateBankrollDto>({
    userId: user?.id ?? 0,
    name: "",
    balance: 0,
    unidValue: 0,
    bookmaker: "",
  });

  // Banca selecionada
  const [selectedBankroll, setSelectedBankroll] = useState<BankrollDto | null>(
    null
  );
  const [bankrollIdToDelete, setBankrollIdToDelete] = useState<string | null>(
    null
  );

  // Queries e mutations
  const { data: bankrolls = [], isLoading: loading } = useBankrolls(
    user?.id ?? 0
  );
  const createBankroll = useCreateBankroll(user?.id ?? 0);
  const deleteBankroll = useDeleteBankroll(user?.id ?? 0);

  // Handlers para edição
  const handleEditClick = (bankroll: BankrollDto) => {
    setSelectedBankroll(bankroll);
    setEditOpen(true);
  };

  // Handlers para visualização de detalhes
  const handleViewDetailsClick = (bankroll: BankrollDto) => {
    setSelectedBankroll(bankroll);
    setInfoOpen(true);
  };

  // Handlers para criação
  const handleOpenCreateModal = () => setOpenCreateModal(true);

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleBankrollSaved = async (
    savedBankroll: Omit<BankrollDto, "id" | "userId">
  ) => {
    try {
      console.log("📤 DADOS ENVIADOS:", {
        balance: savedBankroll.balance,
        unidValue: savedBankroll.unidValue,
      });

      const result = await createBankroll.mutateAsync(savedBankroll);

      console.log("✅ Banca criada com ID:", result.id);
      showNotification("Banca criada com sucesso!", "success", 2000);
      setOpenCreateModal(false);
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

  // Handlers para deleção
  const handleDeleteClick = (id: string) => {
    setBankrollIdToDelete(id);
    setAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setAlertOpen(false);

    if (!bankrollIdToDelete) return;

    try {
      await deleteBankroll.mutateAsync(bankrollIdToDelete);
      showNotification("Banca deletada com sucesso!", "success", 2000);
    } catch {
      showNotification(
        "Erro ao deletar a banca. Tente novamente.",
        "error",
        3000
      );
    } finally {
      setBankrollIdToDelete(null);
    }
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
        <Container maxWidth={false}>
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
            <Typography variant="h5" component="h1" gutterBottom>
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

          <Grid container spacing={2} justifyContent="flex-start">
            {loading ? (
              <Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
                <p>Carregando bancas...</p>
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
                >
                  <BankrollCard
                    bankroll={bankroll}
                    onEdit={() => handleEditClick(bankroll)}
                    onViewDetails={() => handleViewDetailsClick(bankroll)}
                    onDelete={() => handleDeleteClick(bankroll.id.toString())}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>

      {/* Modal de criação */}
      <BankrollFormModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        bankroll={newBankroll} // <--- necessário
        onChange={handleNewBankrollChange}
        onSave={handleBankrollSaved}
      />

      {/* Modal de edição - agora autossuficiente */}
      {selectedBankroll && (
        <BankrollEditModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          bankroll={selectedBankroll}
        />
      )}

      {/* Modal de informações */}
      {selectedBankroll && (
        <BankrollInfoModal
          open={infoOpen}
          onClose={() => setInfoOpen(false)}
          bankrollModal={selectedBankroll}
        />
      )}

      {/* Dialog de confirmação de deleção */}
      <AlertConfirmDialog
        open={alertOpen}
        title="Atenção"
        message="Você tem certeza que deseja deletar esta banca?"
        severity="error"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setAlertOpen(false);
          setBankrollIdToDelete(null);
        }}
      />
    </div>
  );
};

export default BankrollPageContent;
