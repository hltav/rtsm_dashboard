'use client';

import { Grid, TextField } from '@mui/material';

interface NonEditableUserInfoProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const NonEditableUserInfo: React.FC<NonEditableUserInfoProps> = ({
  firstName,
  lastName,
  username,
  email,
}) => {
  return (
    <Grid container spacing={2} mb={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={firstName}
          disabled
          sx={{ mb: { xs: 2, sm: 0 } }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Sobrenome"
          variant="outlined"
          fullWidth
          value={lastName}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nome de Usuário"
          variant="outlined"
          fullWidth
          value={username}
          disabled
          sx={{ mb: { xs: 2, sm: 0 } }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default NonEditableUserInfo;