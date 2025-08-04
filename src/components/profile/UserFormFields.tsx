import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import { UserFormFieldsProps } from "@/modules/profile/props/userFormFields.props";
import { useIBGELocations } from "@/hooks/useIBGELocations";
import { useAuth } from "../Providers/AuthContext";

export const UserFormFields: React.FC<UserFormFieldsProps> = ({
  isEditing,
  onTextFieldChange,
  onSelectChange,
  selectedState: propSelectedState,
  selectedCity: propSelectedCity,
}) => {
  const { user } = useAuth();
  const [internalSelectedState, setInternalSelectedState] = useState(
    propSelectedState || user?.clientData?.address?.state || ""
  );
  const [internalSelectedCity, setInternalSelectedCity] = useState(
    propSelectedCity || user?.clientData?.address?.city || ""
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { states, cities, loadingStates, loadingCities } = useIBGELocations(
    internalSelectedState
  );

  useEffect(() => {
    if (user && isInitialLoad) {
      const initialState =
        propSelectedState || user?.clientData?.address?.state || "";
      const initialCity =
        propSelectedCity || user?.clientData?.address?.city || "";

      setInternalSelectedState(initialState);
      setInternalSelectedCity(initialCity);
      setIsInitialLoad(false);
    }
  }, [user, propSelectedState, propSelectedCity, isInitialLoad]);

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const newState = event.target.value;
    setInternalSelectedState(newState);
    setInternalSelectedCity("");
    onSelectChange(event);
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setInternalSelectedCity(event.target.value);
    onSelectChange(event);
  };

  const isValidState = states.some(
    (state) => state.sigla === internalSelectedState
  );
  const displayStateValue = isValidState ? internalSelectedState : "";

  const isValidCity = cities.some((city) => city.nome === internalSelectedCity);
  const displayCityValue = isValidCity ? internalSelectedCity : "";

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Campos Não Editáveis */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={user.firstname}
            disabled
            sx={{ mb: { xs: 2, sm: 0 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Sobrenome"
            variant="outlined"
            fullWidth
            value={user.lastname}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome de Usuário"
            variant="outlined"
            fullWidth
            value={user.nickname}
            disabled
            sx={{ mb: { xs: 2, sm: 0 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={user.email}
            disabled
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CPF"
            variant="outlined"
            fullWidth
            name="cpf"
            value={user.clientData?.cpf || ""}
            disabled
            sx={{ mb: { xs: 2, sm: 0 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="gender-label">Sexo</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={user.clientData?.gender || ""}
              label="Sexo"
              disabled
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
        {/* Campos Editáveis */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Telefone"
            variant="outlined"
            fullWidth
            name="phone"
            value={user.clientData?.phone || ""}
            onChange={onTextFieldChange}
            placeholder="(XX) XXXXX-XXXX"
            disabled={!isEditing}
            sx={{ mb: { xs: 2, sm: 0 } }}
          />
        </Grid>
        {/* Select de Estado */}
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            disabled={!isEditing || loadingStates}
          >
            <InputLabel id="state-label">Estado</InputLabel>
            <Select
              labelId="state-label"
              name="state"
              value={displayStateValue}
              onChange={handleStateChange}
              label="Estado"
            >
              <MenuItem value="">
                <em>
                  {loadingStates ? "Carregando..." : "Selecione um estado"}
                </em>
              </MenuItem>
              {states.map((state) => (
                <MenuItem key={state.sigla} value={state.sigla}>
                  {state.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Select de Cidade */}
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            disabled={!isEditing || loadingCities || !internalSelectedState}
          >
            <InputLabel id="city-label">Cidade</InputLabel>
            {loadingCities ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: 56,
                  pl: 2,
                }}
              >
                <CircularProgress size={20} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Carregando cidades...
                </Typography>
              </Box>
            ) : (
              <Select
                labelId="city-label"
                name="city"
                value={displayCityValue}
                onChange={handleCityChange}
                label="Cidade"
              >
                <MenuItem value="">
                  <em>
                    {internalSelectedState
                      ? cities.length === 0
                        ? "Nenhuma cidade encontrada"
                        : "Selecione uma cidade"
                      : "Selecione um estado primeiro"}
                  </em>
                </MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city.nome} value={city.nome}>
                    {city.nome}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Bairro"
            variant="outlined"
            fullWidth
            name="neighborhood"
            value={user.clientData?.address?.neighborhood || ""}
            onChange={onTextFieldChange}
            disabled={!isEditing}
          />
        </Grid>
      </Grid>
    </>
  );
};
