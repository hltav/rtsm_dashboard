// "use client";
// import { useState } from "react";
// import {
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   CircularProgress,
// } from "@mui/material";
// import { EditableUserInfoProps } from "@/modules/user/schemas/editableUserInfoProps.schema";
// import { cpfSchema } from "@/utils/validateCpf";
// import { phoneSchema } from "@/utils/phoneValidator";
// import { formatCPFInput } from "@/utils/formatCpf";
// import { formatPhone } from "@/utils/formatPhone";
// import { useIBGELocations } from "@/hooks/useIBGELocations";

// const EditableUserInfo: React.FC<EditableUserInfoProps> = ({
//   cpf,
//   gender,
//   phone,
//   neighborhood,
//   city,
//   state,
//   onCpfChange,
//   onGenderChange,
//   onPhoneChange,
//   onNeighborhoodChange,
//   onCityChange,
//   onStateChange,
// }) => {
//   const [cpfError, setCpfError] = useState<string | null>(null);
//   const [phoneError, setPhoneError] = useState<string | null>(null);
//   const { states, cities, loadingStates, loadingCities } =
//     useIBGELocations(state);

//   const handleStateChange = (value: string) => {
//     onStateChange(value);
//     onCityChange("");
//     onNeighborhoodChange("");
//   };

//   return (
//     <Grid container spacing={2} mb={3}>
//       <Grid item xs={12} sm={6}>
//         <TextField
//           label="CPF"
//           variant="outlined"
//           fullWidth
//           value={cpf}
//           onChange={(e) => {
//             const formattedValue = formatCPFInput(e.target.value);
//             onCpfChange(formattedValue);
//             setCpfError(null);
//           }}
//           onBlur={() => {
//             const result = cpfSchema.safeParse(cpf);
//             if (!result.success) {
//               setCpfError(result.error.issues[0].message);
//             }
//           }}
//           error={!!cpfError}
//           helperText={cpfError}
//         />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="gender-label">Sexo</InputLabel>
//           <Select
//             labelId="gender-label"
//             value={gender}
//             onChange={(e) => onGenderChange(e.target.value as string)}
//             label="Sexo"
//           >
//             <MenuItem value="">
//               <em>Nenhum</em>
//             </MenuItem>
//             <MenuItem value="Masculino">Masculino</MenuItem>
//             <MenuItem value="Feminino">Feminino</MenuItem>
//             <MenuItem value="Outro">Outro</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField
//           label="Telefone"
//           variant="outlined"
//           fullWidth
//           value={phone}
//           onChange={(e) => {
//             const formattedValue = formatPhone(e.target.value);
//             onPhoneChange(formattedValue);
//             setPhoneError(null); // limpa erro enquanto digita
//           }}
//           onBlur={() => {
//             const result = phoneSchema.safeParse(phone);
//             if (!result.success) {
//               setPhoneError(result.error.issues[0].message); // exibe erro do Zod
//             }
//           }}
//           error={!!phoneError}
//           helperText={phoneError}
//         />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="state-label">Estado</InputLabel>
//           <Select
//             labelId="state-label"
//             value={state}
//             onChange={(e) => handleStateChange(e.target.value as string)}
//             label="Estado"
//             disabled={loadingStates}
//             endAdornment={
//               loadingStates && <CircularProgress color="inherit" size={20} />
//             }
//           >
//             <MenuItem value="">
//               <em>Nenhum</em>
//             </MenuItem>
//             {states.map((uf) => (
//               <MenuItem key={uf.sigla} value={uf.sigla}>
//                 {uf.nome}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="city-label">Cidade</InputLabel>
//           <Select
//             labelId="city-label"
//             value={city}
//             onChange={(e) => onCityChange(e.target.value as string)}
//             label="Cidade"
//             disabled={!state || loadingCities}
//             endAdornment={
//               loadingCities && <CircularProgress color="inherit" size={20} />
//             }
//           >
//             <MenuItem value="">
//               <em>Nenhum</em>
//             </MenuItem>
//             {cities.map((city) => (
//               <MenuItem key={city.nome} value={city.nome}>
//                 {city.nome}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField
//           label="Bairro"
//           variant="outlined"
//           fullWidth
//           value={neighborhood}
//           onChange={(e) => onNeighborhoodChange(e.target.value)}
//           disabled={!city}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default EditableUserInfo;

"use client";
import { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from "@mui/material";
import { EditableUserInfoProps } from "@/modules/user/schemas/editableUserInfoProps.schema";
import { cpfSchema } from "@/utils/validateCpf";
import { phoneSchema } from "@/utils/phoneValidator";
import { formatCPFInput } from "@/utils/formatCpf";
import { formatPhone } from "@/utils/formatPhone";
import { useIBGELocations } from "@/hooks/useIBGELocations";

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
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const { states, cities, loadingStates, loadingCities } =
    useIBGELocations(state);

  const handleStateChange = (value: string) => {
    onStateChange(value);
    onCityChange("");
    onNeighborhoodChange("");
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
            // 🔥 permite apagar no mobile
            if (e.target.value === "") {
              onCpfChange("");
              setCpfError(null);
              return;
            }

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
            // 🔥 permite apagar no mobile
            if (e.target.value === "") {
              onPhoneChange("");
              setPhoneError(null);
              return;
            }

            const formattedValue = formatPhone(e.target.value);
            onPhoneChange(formattedValue);
            setPhoneError(null);
          }}
          onBlur={() => {
            const result = phoneSchema.safeParse(phone);
            if (!result.success) {
              setPhoneError(result.error.issues[0].message);
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
