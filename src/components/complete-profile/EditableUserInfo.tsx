"use client";
import { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  EditableUserInfoProps,
  IBGECity,
  IBGEState,
} from "@/modules/user/schemas/editableUserInfoProps.schema";
import { cpfSchema } from "@/utils/validateCpf";
import { phoneSchema } from "@/utils/phoneValidator";
import { formatCPFInput } from "@/utils/formatCpf";
import { formatPhone } from "@/utils/formatPhone";

const EditableUserInfo: React.FC<EditableUserInfoProps> = ({
  cpf,
  gender,
  phone,
  neighborhood,
  city,
  state,
  onCpfChange,
  onGenderChange,
  onPhoneChange,
  onNeighborhoodChange,
  onCityChange,
  onStateChange,
}) => {
  const [states, setStates] = useState<IBGEState[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Carrega estados do IBGE
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Carrega cidades quando estado muda
  useEffect(() => {
    const fetchCities = async () => {
      if (!state) {
        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [state]);

  const handleStateChange = (value: string) => {
    onStateChange(value);
    onCityChange(""); // Reseta a cidade quando muda o estado
    onNeighborhoodChange(""); // Reseta o bairro
  };

  return (
    <Grid container spacing={2} mb={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="CPF"
          variant="outlined"
          fullWidth
          value={cpf}
          onChange={(e) => {
            const formattedValue = formatCPFInput(e.target.value);
            onCpfChange(formattedValue);
            setCpfError(null);
          }}
          onBlur={() => {
            const result = cpfSchema.safeParse(cpf);
            if (!result.success) {
              setCpfError(result.error.issues[0].message);
            }
          }}
          error={!!cpfError}
          helperText={cpfError}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="gender-label">Sexo</InputLabel>
          <Select
            labelId="gender-label"
            value={gender}
            onChange={(e) => onGenderChange(e.target.value as string)}
            label="Sexo"
          >
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Feminino">Feminino</MenuItem>
            <MenuItem value="Outro">Outro</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Telefone"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => {
            const formattedValue = formatPhone(e.target.value);
            onPhoneChange(formattedValue);
            setPhoneError(null); // limpa erro enquanto digita
          }}
          onBlur={() => {
            const result = phoneSchema.safeParse(phone);
            if (!result.success) {
              setPhoneError(result.error.issues[0].message); // exibe erro do Zod
            }
          }}
          error={!!phoneError}
          helperText={phoneError}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="state-label">Estado</InputLabel>
          <Select
            labelId="state-label"
            value={state}
            onChange={(e) => handleStateChange(e.target.value as string)}
            label="Estado"
            disabled={loadingStates}
            endAdornment={
              loadingStates && <CircularProgress color="inherit" size={20} />
            }
          >
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
            {states.map((uf) => (
              <MenuItem key={uf.sigla} value={uf.sigla}>
                {uf.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="city-label">Cidade</InputLabel>
          <Select
            labelId="city-label"
            value={city}
            onChange={(e) => onCityChange(e.target.value as string)}
            label="Cidade"
            disabled={!state || loadingCities}
            endAdornment={
              loadingCities && <CircularProgress color="inherit" size={20} />
            }
          >
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.nome} value={city.nome}>
                {city.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Bairro"
          variant="outlined"
          fullWidth
          value={neighborhood}
          onChange={(e) => onNeighborhoodChange(e.target.value)}
          disabled={!city}
        />
      </Grid>
    </Grid>
  );
};

export default EditableUserInfo;
