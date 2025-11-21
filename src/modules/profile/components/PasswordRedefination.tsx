// "use client";
// import React, { useState } from "react";
// import { Box, Typography, TextField, Button, Container } from "@mui/material";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";

// interface PasswordRedefinationFormProps {
//   onSubmit: (email: string) => void;
// }

// const PasswordRedefination: React.FC<PasswordRedefinationFormProps> = ({
//   onSubmit,
// }) => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(email);
//   };

//   return (
//     <Container
//       sx={{ width: "40%", justifyContent: "center", alignItems: "center" }}
//     >
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           p: { xs: 3, sm: 4, md: 6 },
//           bgcolor: "background.paper",
//           width: "100%",
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <MailOutlineIcon sx={{ fontSize: 50 }} />
//         </Box>

//         <Typography
//           variant="h5"
//           component="h1"
//           gutterBottom
//           textAlign="center"
//           sx={{ mb: 1, fontWeight: 600 }}
//         >
//           Redefina sua Senha
//         </Typography>
//         <Typography textAlign="center" sx={{ mb: 4, fontWeight: 400 }}>
//           Insira seu email para receber um link de redefinição da sua senha.
//         </Typography>

//         <TextField
//           label="Seu Email"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           type="email"
//           size="medium"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           sx={{ mb: 3 }}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           size="large"
//           sx={{ py: 1.5, mb: 2 }}
//         >
//           Enviar Link de Redefinição de Senha
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default PasswordRedefination;

"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

interface PasswordRedefinationFormProps {
  onSubmit: (email: string) => void;
}

const PasswordRedefination: React.FC<PasswordRedefinationFormProps> = ({
  onSubmit,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Container
      sx={{
        width: { xs: "100%", sm: "80%", md: "50%", lg: "40%" },
        mt: 4, // distância para o topo (tabs)
        p: 0,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: "background.paper",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <MailOutlineIcon sx={{ fontSize: 50 }} />
        </Box>

        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          Redefina sua Senha
        </Typography>

        <Typography textAlign="center" sx={{ mb: 4 }}>
          Insira seu email para receber um link de redefinição da sua senha.
        </Typography>

        <TextField
          label="Seu Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          size="medium"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ py: 1.5, mb: 2 }}
        >
          Enviar Link de Redefinição de Senha
        </Button>
      </Box>
    </Container>
  );
};

export default PasswordRedefination;
