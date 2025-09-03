"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  SelectChangeEvent,
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import {
  Add as AddIcon,
  FilterList as FilterListIcon,
  Info as InfoIcon,
  Edit as EditIcon,
  CheckCircleOutline as SaveIcon,
  CancelOutlined as CancelIcon,
} from "@mui/icons-material";

// Define um tema escuro para a aplicação, baseado nas cores do seu código original
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4CAF50", // Verde para botões e destaque
    },
    secondary: {
      main: "#E0A800", // Amarelo para edição
    },
    background: {
      default: "#0A1929",
      paper: "#1A2B42",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
        head: {
          backgroundColor: "#1A2B42",
          fontWeight: "bold",
        },
        body: {
          backgroundColor: "#1E3A5F",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(255, 255, 255, 0.23)",
        },
        root: {
          color: "#fff",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E0A800",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-contained.Mui-disabled": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            color: "rgba(255, 255, 255, 0.3)",
          },
        },
      },
    },
  },
});

// A interface define a estrutura de um objeto de evento.
interface EventItem {
  id: string;
  category: string;
  eventType: string;
  event: string;
  market: string;
  amount: number;
  result: string;
}

// Eventos iniciais para fins de demonstração.
const initialEvents: EventItem[] = [
  {
    id: "1",
    category: "Futebol",
    eventType: "Pré-Jogo",
    event: "Real Madrid vs Barcelona",
    market: "Vencedor do Jogo",
    amount: 10,
    result: "Ganho",
  },
  {
    id: "2",
    category: "Basquete",
    eventType: "Ao Vivo",
    event: "Lakers vs Warriors",
    market: "Handicap",
    amount: 5,
    result: "Perda",
  },
  {
    id: "3",
    category: "Tênis",
    eventType: "Pré-Jogo",
    event: "Nadal vs Federer",
    market: "Total de Games",
    amount: 20,
    result: "Empate",
  },
  {
    id: "4",
    category: "Futebol",
    eventType: "Ao Vivo",
    event: "Brasil vs Argentina",
    market: "Ambos Marcam",
    amount: 15,
    result: "Ganho",
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "75%", md: 450 },
  bgcolor: "#1A2B42",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: "auto",
  maxHeight: "90vh",
};

const EventCompletePage = () => {
  const isMobile = useMediaQuery(darkTheme.breakpoints.down("sm"));

  const [events, setEvents] = useState<EventItem[]>(initialEvents);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [newEvent, setNewEvent] = useState<Omit<EventItem, "id">>({
    category: "",
    eventType: "",
    event: "",
    market: "",
    amount: 0,
    result: "",
  });
  const [selectedEventForInfo, setSelectedEventForInfo] =
    useState<EventItem | null>(null);
  const [selectedEventForEdit, setSelectedEventForEdit] =
    useState<EventItem | null>(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterEventType, setFilterEventType] = useState("");
  const [filterEvent, setFilterEvent] = useState("");
  const [filterMarket, setFilterMarket] = useState("");
  const [filterAmountRange, setFilterAmountRange] = useState("");
  const [filterResult, setFilterResult] = useState("");

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewEvent({
      category: "",
      eventType: "",
      event: "",
      market: "",
      amount: 0,
      result: "",
    });
  };

  const handleNewEventChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newEvent.category ||
      !newEvent.eventType ||
      !newEvent.event ||
      !newEvent.market ||
      newEvent.amount === 0 ||
      !newEvent.result
    ) {
      console.error("Por favor, preencha todos os campos.");
      return;
    }

    const amountNum = parseFloat(String(newEvent.amount));

    if (isNaN(amountNum) || amountNum <= 0) {
      console.error(
        "Valor da unidade apostada deve ser um número válido e maior que zero."
      );
      return;
    }

    const newId = Date.now().toString();
    setEvents((prev) => [
      ...prev,
      {
        id: newId,
        category: newEvent.category,
        eventType: newEvent.eventType,
        event: newEvent.event,
        market: newEvent.market,
        amount: amountNum,
        result: newEvent.result,
      },
    ]);
    handleCloseAddModal();
  }; // Funções para o Modal de Detalhes (Info)

  const handleOpenInfoModal = (eventItem: EventItem) => {
    setSelectedEventForInfo(eventItem);
    setOpenInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setOpenInfoModal(false);
    setSelectedEventForInfo(null);
  };

  const handleOpenEditModal = (eventItem: EventItem) => {
    setSelectedEventForEdit({ ...eventItem });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedEventForEdit(null);
  };

  const handleEditedEventChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setSelectedEventForEdit((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSaveEditedEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedEventForEdit?.category ||
      !selectedEventForEdit?.eventType ||
      !selectedEventForEdit?.event ||
      !selectedEventForEdit?.market ||
      selectedEventForEdit?.amount === 0 ||
      !selectedEventForEdit?.result
    ) {
      console.error("Por favor, preencha todos os campos para edição.");
      return;
    }

    const amountNum = parseFloat(String(selectedEventForEdit.amount));

    if (isNaN(amountNum) || amountNum <= 0) {
      console.error(
        "Valor da unidade apostada deve ser um número válido e maior que zero para edição."
      );
      return;
    }

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventForEdit.id
          ? { ...selectedEventForEdit, amount: amountNum }
          : event
      )
    );
    handleCloseEditModal();
  }; 

  const handleFilterChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "category":
        setFilterCategory(value);
        break;
      case "eventType":
        setFilterEventType(value);
        break;
      case "event":
        setFilterEvent(value);
        break;
      case "market":
        setFilterMarket(value);
        break;
      case "amountRange":
        setFilterAmountRange(value);
        break;
      case "result":
        setFilterResult(value);
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setFilterCategory("");
    setFilterEventType("");
    setFilterEvent("");
    setFilterMarket("");
    setFilterAmountRange("");
    setFilterResult("");
  }; 

  const uniqueCategories = Array.from(new Set(events.map((e) => e.category)));
  const uniqueEventTypes = Array.from(new Set(events.map((e) => e.eventType)));
  const uniqueEvents = Array.from(new Set(events.map((e) => e.event)));
  const uniqueMarkets = Array.from(new Set(events.map((e) => e.market)));
  const amountRanges = ["", "0-10", "10-20", "20-50", "50+"]; 

  const filteredEvents = events.filter((event) => {
    let amountValid = true;
    if (filterAmountRange) {
      const [minStr, maxStr] = filterAmountRange.split("-");
      const min = parseInt(minStr, 10);
      const max = maxStr && maxStr !== "+" ? parseInt(maxStr, 10) : Infinity;
      amountValid = event.amount >= min && event.amount <= max;
    }

    return (
      (filterCategory === "" || event.category === filterCategory) &&
      (filterEventType === "" || event.eventType === filterEventType) &&
      (filterEvent === "" || event.event === filterEvent) &&
      (filterMarket === "" || event.market === filterMarket) &&
      amountValid &&
      (filterResult === "" || event.result === filterResult)
    );
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          p: { xs: 2, sm: 4 },
          mt: "10%",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            p: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              mb: 4,
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography variant="h4" component="h1" fontWeight="bold">
              Eventos
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {isMobile ? (
                <IconButton
                  onClick={() => setOpenFilterModal(true)}
                  sx={{ bgcolor: "#1A2B42", color: "#4CAF50" }}
                >
                  <FilterListIcon />
                </IconButton>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setOpenFilterModal(true)}
                  sx={{
                    bgcolor: "#1A2B42",
                    "&:hover": {
                      bgcolor: "#2A4060",
                    },
                  }}
                  startIcon={<FilterListIcon />}
                >
                  Filtros
                </Button>
              )}
              {isMobile ? (
                <IconButton
                  onClick={handleOpenAddModal}
                  sx={{
                    bgcolor: "#E0A800",
                    "&:hover": {
                      bgcolor: "#E0A800",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleOpenAddModal}
                  sx={{ bgcolor: "#E0A800" }}
                  startIcon={<AddIcon />}
                >
                  Adicionar
                </Button>
              )}
            </Box>
          </Box>
          <TableContainer component={Paper} elevation={3}>
            <Table aria-label="events table">
              <TableHead>
                <TableRow>
                  <TableCell>Evento</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Categoria
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Mercado
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                    Valor
                  </TableCell>
                  <TableCell align="right">Resultado</TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            noWrap
                          >
                            {event.event}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              display: { xs: "block", sm: "none" },
                              color: "text.secondary",
                            }}
                          >
                            {`${event.category} - ${event.market}`}
                          </Typography>
                          <Box
                            sx={{
                              display: { xs: "flex", sm: "none" },
                              gap: 1,
                              mt: 1,
                            }}
                          >
                            <IconButton
                              sx={{ color: "#4CAF50" }}
                              onClick={() => handleOpenInfoModal(event)}
                            >
                              <InfoIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => handleOpenEditModal(event)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        {event.category}
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        {event.market}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        ${event.amount}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ width: isMobile ? "30%" : "auto" }}
                      >
                        {event.result}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        <IconButton
                          sx={{ color: "#4CAF50" }}
                          onClick={() => handleOpenInfoModal(event)}
                        >
                          <InfoIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleOpenEditModal(event)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Nenhum evento encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal open={openAddModal} onClose={handleCloseAddModal}>
            <Box sx={modalStyle} component="form" onSubmit={handleSaveNewEvent}>
              <Typography variant="h5" component="h2" mb={4}>
                Novo Evento
              </Typography>
              <TextField
                fullWidth
                label="Categoria (ex: Futebol)"
                name="category"
                value={newEvent.category}
                onChange={handleNewEventChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Tipo de Evento (ex: Pré-Jogo)"
                name="eventType"
                value={newEvent.eventType}
                onChange={handleNewEventChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Evento (ex: Real Madrid vs Barcelona)"
                name="event"
                value={newEvent.event}
                onChange={handleNewEventChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Mercado (ex: Vencedor do Jogo)"
                name="market"
                value={newEvent.market}
                onChange={handleNewEventChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Valor da Aposta"
                name="amount"
                type="number"
                value={newEvent.amount}
                onChange={handleNewEventChange}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Resultado</InputLabel>
                <Select
                  name="result"
                  value={newEvent.result}
                  onChange={handleNewEventChange}
                  label="Resultado"
                >
                  <MenuItem value="">Selecione o Resultado</MenuItem>
                  <MenuItem value="Ganho">Ganho</MenuItem>
                  <MenuItem value="Perda">Perda</MenuItem>
                  <MenuItem value="Empate">Empate</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button
                  onClick={handleCloseAddModal}
                  sx={{ mr: 2 }}
                  variant="outlined"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#E0A800" }}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Modal>
          <Modal open={openInfoModal} onClose={handleCloseInfoModal}>
            <Box sx={modalStyle}>
              <Typography variant="h5" component="h2" mb={4}>
                Detalhes do Evento
              </Typography>
              {selectedEventForInfo && (
                <Box>
                  <Typography>
                    <Typography component="span" fontWeight="bold">
                      ID:
                    </Typography>
                    {selectedEventForInfo.id}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight="bold">
                      Categoria:
                    </Typography>
                    {selectedEventForInfo.category}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight="bold">
                      Tipo:
                    </Typography>
                    {selectedEventForInfo.eventType}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight="bold">
                      Evento:
                    </Typography>
                    {selectedEventForInfo.event}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight="bold">
                      Mercado:
                    </Typography>
                    {selectedEventForInfo.market}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight="bold">
                      Aposta:
                    </Typography>
                    ${selectedEventForInfo.amount}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight="bold">
                      Resultado:
                    </Typography>
                    {selectedEventForInfo.result}
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button onClick={handleCloseInfoModal} variant="outlined">
                  Fechar
                </Button>
              </Box>
            </Box>
          </Modal>
          <Modal open={openEditModal} onClose={handleCloseEditModal}>
            <Box
              sx={modalStyle}
              component="form"
              onSubmit={handleSaveEditedEvent}
            >
              <Typography variant="h5" component="h2" mb={4}>
                Editar Evento
              </Typography>
              {selectedEventForEdit && (
                <Box>
                  <TextField
                    fullWidth
                    label="Categoria"
                    name="category"
                    value={selectedEventForEdit.category}
                    onChange={handleEditedEventChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Tipo de Evento"
                    name="eventType"
                    value={selectedEventForEdit.eventType}
                    onChange={handleEditedEventChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Evento"
                    name="event"
                    value={selectedEventForEdit.event}
                    onChange={handleEditedEventChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Mercado"
                    name="market"
                    value={selectedEventForEdit.market}
                    onChange={handleEditedEventChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Valor da Aposta"
                    name="amount"
                    type="number"
                    value={selectedEventForEdit.amount}
                    onChange={handleEditedEventChange}
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Resultado</InputLabel>
                    <Select
                      name="result"
                      value={selectedEventForEdit.result}
                      onChange={handleEditedEventChange}
                      label="Resultado"
                    >
                      <MenuItem value="">Selecione o Resultado</MenuItem>
                      <MenuItem value="Ganho">Ganho</MenuItem>
                      <MenuItem value="Perda">Perda</MenuItem>
                      <MenuItem value="Empate">Empate</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button
                  onClick={handleCloseEditModal}
                  sx={{ mr: 2 }}
                  variant="outlined"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#E0A800" }}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Modal>
          <Modal
            open={openFilterModal}
            onClose={() => setOpenFilterModal(false)}
          >
            <Box sx={modalStyle}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5" component="h2">
                  Filtros
                </Typography>
                <Box>
                  <IconButton
                    onClick={() => setOpenFilterModal(false)}
                    sx={{ color: "red" }}
                  >
                    <CancelIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setOpenFilterModal(false)}
                    color="primary"
                  >
                    <SaveIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                  gap: 2,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="category-label">Categoria</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={filterCategory}
                    onChange={handleFilterChange}
                    label="Categoria"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {uniqueCategories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="eventType-label">Tipo de Evento</InputLabel>
                  <Select
                    labelId="eventType-label"
                    name="eventType"
                    value={filterEventType}
                    onChange={handleFilterChange}
                    label="Tipo de Evento"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {uniqueEventTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="event-label">Evento</InputLabel>
                  <Select
                    labelId="event-label"
                    name="event"
                    value={filterEvent}
                    onChange={handleFilterChange}
                    label="Evento"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {uniqueEvents.map((evt) => (
                      <MenuItem key={evt} value={evt}>
                        {evt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="market-label">Mercado</InputLabel>
                  <Select
                    labelId="market-label"
                    name="market"
                    value={filterMarket}
                    onChange={handleFilterChange}
                    label="Mercado"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {uniqueMarkets.map((mkt) => (
                      <MenuItem key={mkt} value={mkt}>
                        {mkt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="amountRange-label">Valor</InputLabel>
                  <Select
                    labelId="amountRange-label"
                    name="amountRange"
                    value={filterAmountRange}
                    onChange={handleFilterChange}
                    label="Valor"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {amountRanges.slice(1).map((range) => (
                      <MenuItem key={range} value={range}>
                        ${range}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="result-label">Resultado</InputLabel>
                  <Select
                    labelId="result-label"
                    name="result"
                    value={filterResult}
                    onChange={handleFilterChange}
                    label="Resultado"
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="Ganho">Ganho</MenuItem>
                    <MenuItem value="Perda">Perda</MenuItem>
                    <MenuItem value="Empate">Empate</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 4,
                  gap: 1,
                }}
              >
                <Button
                  onClick={handleClearFilters}
                  variant="outlined"
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Limpar
                </Button>
              </Box>
            </Box>
          </Modal>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EventCompletePage;
