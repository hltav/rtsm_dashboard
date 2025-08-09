// "use client";
// import React, { useState, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   createTheme,
//   ThemeProvider,
//   CssBaseline,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Modal,
//   TextField,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import InfoIcon from "@mui/icons-material/Info";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

// const baseTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#1A2B42", // Azul escuro do logo
//       light: "#3A4B62",
//       dark: "#0A1B2C",
//       contrastText: "#fff",
//     },
//     secondary: {
//       main: "#E0A800", // Dourado/Laranja do logo
//       light: "#FFC83D",
//       dark: "#B38600",
//       contrastText: "#000",
//     },
//     success: {
//       // Nova cor para o ícone de info (verde)
//       main: "#4CAF50",
//       contrastText: "#fff",
//     },
//     warning: {
//       // Nova cor para o ícone de editar (amarelo)
//       main: "#FFC107",
//       contrastText: "#000",
//     },
//     background: {
//       default: "#f4f6f8", // Cor de fundo suave para o corpo
//       paper: "#fff", // Cor de fundo para Cards e Paper (será sobrescrito no useMemo)
//     },
//     text: {
//       primary: "#333",
//       secondary: "#555",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//     h1: {
//       fontSize: "3.5rem",
//       fontWeight: 700,
//       "@media (max-width:600px)": { fontSize: "2.5rem" },
//     },
//     h2: {
//       fontSize: "2.8rem",
//       fontWeight: 600,
//       "@media (max-width:600px)": { fontSize: "2rem" },
//     },
//     h3: {
//       fontSize: "2.2rem",
//       fontWeight: 600,
//       "@media (max-width:600px)": { fontSize: "1.8rem" },
//     },
//     h4: {
//       fontSize: "1.8rem",
//       fontWeight: 600,
//       "@media (max-width:600px)": { fontSize: "1.5rem" },
//     },
//     h5: {
//       fontSize: "1.5rem",
//       fontWeight: 500,
//       "@media (max-width:600px)": { fontSize: "1.2rem" },
//     },
//     h6: {
//       fontSize: "1.2rem",
//       fontWeight: 500,
//       "@media (max-width:600px)": { fontSize: "1rem" },
//     },
//     body1: { fontSize: "1rem", lineHeight: 1.6 },
//     body2: { fontSize: "0.875rem", lineHeight: 1.5 },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           textTransform: "none",
//         },
//       },
//     },
//     MuiCard: {
//       // Estilos para os Cards
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
//           transition:
//             "transform 0.2s ease-in-out, border-color 0.2s ease-in-out",
//           "&:hover": {
//             transform: "translateY(-5px)",
//             boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)", // Sombra ainda mais pronunciada no hover
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       // Estilos para os TextFields
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 8,
//           },
//         },
//       },
//     },
//   },
// });
// // Dados de bancas simulados
// const initialBankrolls = [
//   {
//     id: "1",
//     name: "Banca Principal",
//     balance: 1500.75,
//     unidValue: 15.0,
//     bookmaker: "Bet365",
//   },
//   {
//     id: "2",
//     name: "Banca de Teste",
//     balance: 250.0,
//     unidValue: 2.5,
//     bookmaker: "Sportingbet",
//   },
//   {
//     id: "3",
//     name: "Banca de Cripto",
//     balance: 500.0,
//     unidValue: 5.0,
//     bookmaker: "Stake",
//   },
//   {
//     id: "4",
//     name: "Banca de Futebol",
//     balance: 800.5,
//     unidValue: 8.0,
//     bookmaker: "Betfair",
//   },
// ];
// const BankrollsPage = () => {
//   const [bankrolls, setBankrolls] = useState(initialBankrolls);
//   const [darkMode, setDarkMode] = useState(false); // Estado para o tema claro/escuro
//   const [openModal, setOpenModal] = useState(false); // Estado para controlar o modal
//   const [newBankroll, setNewBankroll] = useState({
//     // Estado para o formulário da nova banca
//     name: "",
//     balance: "",
//     unidValue: "",
//     bookmaker: "",
//   });
//   // Tema ajustado para o modo escuro (simples, apenas para demonstração do toggle)
//   const currentTheme = useMemo(
//     () =>
//       createTheme({
//         ...baseTheme,
//         palette: {
//           ...baseTheme.palette,
//           mode: darkMode ? "dark" : "light",
//           background: {
//             default: darkMode ? "#121212" : "#f4f6f8", // Cor de fundo da página
//             paper: "#0A1B2C", // Cor de fundo dos Cards: #0A1B2C em ambos os modos
//           },
//           text: {
//             primary: darkMode ? "#E0E0E0" : "#0A1B2C", // Texto primário: cinza claro no escuro, azul escuro no claro
//             secondary: darkMode ? "#B0B0B0" : "#555", // Texto secundário: cinza médio no escuro, cinza escuro no claro
//           },
//         },
//       }),
//     [darkMode, baseTheme]
//   );
//   // Função para formatar valores monetários
//   const formatCurrency = (value: number) => {
//     return new Intl.NumberFormat("pt-BR", {
//       style: "currency",
//       currency: "BRL",
//     }).format(value);
//   };
//   const handleThemeToggle = () => {
//     setDarkMode(!darkMode);
//   };
//   const handleEditClick = (id: string) => {
//     console.log("Editar banca:", id);
//     // Lógica para navegar para a página de edição ou abrir um modal
//   };
//   const handleViewDetailsClick = (id: string) => {
//     console.log("Ver detalhes da banca:", id);
//     // Lógica para navegar para a página de detalhes ou abrir um modal
//   };
//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };
//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setNewBankroll({ name: "", balance: "", unidValue: "", bookmaker: "" }); // Resetar formulário
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

//   const handleSaveNewBankroll = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (
//       !newBankroll.name ||
//       !newBankroll.balance ||
//       !newBankroll.unidValue ||
//       !newBankroll.bookmaker
//     ) {
//       console.error("Por favor, preencha todos os campos.");
//       return;
//     }
//     const balanceNum = parseFloat(newBankroll.balance);
//     const unidValueNum = parseFloat(newBankroll.unidValue);
//     if (isNaN(balanceNum) || isNaN(unidValueNum) || unidValueNum === 0) {
//       // Substituindo alert por uma mensagem no console ou um modal de erro MUI
//       console.error(
//         "Saldo e Valor por Unid devem ser números válidos e Valor por Unid não pode ser zero."
//       );
//       return;
//     }
//     // Gerar um ID único (ex: usando timestamp ou uma biblioteca como uuid)
//     const newId = Date.now().toString(); // Simplesmente usando o timestamp como ID
//     setBankrolls((prev) => [
//       ...prev,
//       {
//         id: newId,
//         name: newBankroll.name,
//         balance: balanceNum,
//         unidValue: unidValueNum,
//         bookmaker: newBankroll.bookmaker,
//       },
//     ]);
//     handleCloseModal(); // Fechar modal após salvar
//   };
//   return (
//     <ThemeProvider theme={currentTheme}>
//       <CssBaseline />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           bgcolor: "background.default", // Usa a cor de fundo padrão do tema
//           p: { xs: 2, sm: 3, md: 4 },
//           width: "100%",
//         }}
//       >
//         <Container
//           maxWidth="lg"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             width: "100%",
//             py: 4,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//               mb: 4,
//             }}
//           >
//             <Typography
//               variant="h4"
//               component="h1"
//               gutterBottom
//               sx={{
//                 fontWeight: 700,
//                 mb: 0,
//                 color: currentTheme.palette.text.primary, // Corrigido para usar a cor do tema
//                 transition: "color 0.3s ease",
//               }}
//             >
//               Minhas Bancas
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               {" "}
//               {/* Agrupamento para botão e toggle */}
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 onClick={handleOpenModal} // Abre o modal
//               >
//                 Nova Banca
//               </Button>
//               <IconButton
//                 onClick={handleThemeToggle}
//                 color="inherit"
//                 sx={{ color: currentTheme.palette.text.primary }}
//               >
//                 {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//               </IconButton>
//             </Box>
//           </Box>
//           <Grid container spacing={4} justifyContent="flex-start">
//             {" "}
//             {/* Alinhamento à esquerda */}
//             {bankrolls.map((bankroll) => (
//               <Grid item xs={12} sm={6} md={4} key={bankroll.id}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     border: darkMode
//                       ? "1px solid transparent"
//                       : "1px solid rgba(26, 43, 66, 0.08)",
//                     bgcolor: "background.paper", // Usa a cor de fundo do Paper do tema (#0A1B2C)
//                   }}
//                 >
//                   <CardContent sx={{ flexGrow: 1, position: "relative" }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         mb: 1.5,
//                       }}
//                     >
//                       <Typography
//                         variant="h5"
//                         component="div"
//                         sx={{
//                           fontWeight: 600,
//                           color: "#FFFFFF", // Título do card sempre branco
//                         }}
//                       >
//                         {bankroll.name}
//                       </Typography>
//                       <Box>
//                         <IconButton
//                           size="small"
//                           sx={{
//                             color: currentTheme.palette.success.main,
//                             mr: 0.5,
//                           }}
//                           onClick={() => handleViewDetailsClick(bankroll.id)}
//                         >
//                           <InfoIcon />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           sx={{ color: currentTheme.palette.warning.main }}
//                           onClick={() => handleEditClick(bankroll.id)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </Box>
//                     </Box>
//                     <Typography variant="body1" sx={{ color: "#D0D0D0" }}>
//                       {" "}
//                       {/* Texto secundário do card sempre cinza claro */}
//                       <strong>Casa de Apostas:</strong> {bankroll.bookmaker}
//                     </Typography>
//                     <Typography variant="body1" sx={{ color: "#D0D0D0" }}>
//                       <strong>Saldo:</strong> {formatCurrency(bankroll.balance)}
//                     </Typography>
//                     <Typography variant="body1" sx={{ color: "#D0D0D0" }}>
//                       <strong>Valor por Unid:</strong>{" "}
//                       {formatCurrency(bankroll.unidValue)}
//                     </Typography>
//                     <Typography variant="body1" sx={{ color: "#D0D0D0" }}>
//                       <strong>Número de Unids:</strong>{" "}
//                       {(bankroll.balance / bankroll.unidValue).toFixed(2)}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       {/* Modal para Adicionar Nova Banca */}
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 400 },
//             bgcolor: "background.paper", // Fundo do modal também será #0A1B2C
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <Typography
//             id="modal-title"
//             variant="h6"
//             component="h2"
//             sx={{ color: "#FFFFFF" }}
//           >
//             Adicionar Nova Banca
//           </Typography>
//           <TextField
//             label="Nome da Banca"
//             name="name"
//             value={newBankroll.name}
//             onChange={handleNewBankrollChange}
//             fullWidth
//             variant="outlined"
//             InputLabelProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "&.Mui-focused": {
//                   color: "#FFFFFF", // Label branca quando focada
//                 },
//               },
//             }}
//             InputProps={{
//               sx: {
//                 color: "#FFFFFF", // Cor do texto digitado
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF", // Borda padrão
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF", // Borda no hover
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF", // Borda no foco
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="Saldo (R$)"
//             name="balance"
//             value={newBankroll.balance}
//             onChange={handleNewBankrollChange}
//             fullWidth
//             variant="outlined"
//             type="number"
//             inputProps={{ step: "0.01" }}
//             InputLabelProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "&.Mui-focused": {
//                   color: "#FFFFFF", // Label branca quando focada
//                 },
//               },
//             }}
//             InputProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="Valor por Unid"
//             name="unidValue"
//             value={newBankroll.unidValue}
//             onChange={handleNewBankrollChange}
//             fullWidth
//             variant="outlined"
//             type="number"
//             inputProps={{ step: "0.01" }}
//             InputLabelProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "&.Mui-focused": {
//                   color: "#FFFFFF", // Label branca quando focada
//                 },
//               },
//             }}
//             InputProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="Casa de Apostas"
//             name="bookmaker"
//             value={newBankroll.bookmaker}
//             onChange={handleNewBankrollChange}
//             fullWidth
//             variant="outlined"
//             InputLabelProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "&.Mui-focused": {
//                   color: "#FFFFFF", // Label branca quando focada
//                 },
//               },
//             }}
//             InputProps={{
//               sx: {
//                 color: "#FFFFFF",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#FFFFFF",
//                 },
//               },
//             }}
//           />
//           <Box
//             sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
//           >
//             <Button
//               variant="outlined"
//               onClick={handleCloseModal}
//               sx={{
//                 color: "#FFFFFF", // Cor do texto do botão Cancelar
//                 borderColor: "#FFFFFF", // Cor da borda do botão Cancelar
//                 "&:hover": {
//                   borderColor: "#FFFFFF", // Borda no hover
//                   opacity: 0.8, // Pequena opacidade no hover
//                 },
//               }}
//             >
//               Cancelar
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSaveNewBankroll}
//             >
//               Salvar
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </ThemeProvider>
//   );
// };
// export default BankrollsPage;

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
import { initialBankrolls } from "./interface/initialBankrolls.interface";
import { BankrollCard } from "./components/BankrollCard";
import { useThemeMode } from "@/components/Providers/ThemeRegistry";
import { BankrollFormModal } from "./components/BankrollFormModal";

const BankrollPage = () => {
  const [bankrolls, setBankrolls] = useState<BankrollDto[]>(initialBankrolls);
  const [openModal, setOpenModal] = useState(false);
  const [newBankroll, setNewBankroll] = useState({
    name: "",
    balance: "",
    unidValue: "",
    bookmaker: "",
  });
  const { mode } = useThemeMode();

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

  const handleSaveNewBankroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !newBankroll.name ||
      !newBankroll.balance ||
      !newBankroll.unidValue ||
      !newBankroll.bookmaker
    ) {
      console.error("Por favor, preencha todos os campos.");
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

    const newId = Date.now().toString();
    setBankrolls((prev) => [
      ...prev,
      {
        id: newId,
        name: newBankroll.name,
        balance: balanceNum,
        unidValue: unidValueNum,
        bookmaker: newBankroll.bookmaker,
      },
    ]);
    handleCloseModal();
  };

  return (
    <div className={mode === 'dark' ? 'dark-mode-styles' : 'light-mode-styles'}>
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
              alignItems: "center",
              width: "100%",
              mb: 4,
              mt:{ xs: "7%", sm: "2%", md: '2%'}
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
          <Grid container spacing={4} justifyContent="flex-start">
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
