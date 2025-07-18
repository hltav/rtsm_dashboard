"use client";

import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "./PasswordInput";
import { RegisterHeader } from "./RegisterHeader";
import { RegisterFooter } from "./RegisterFooter";
import {
  RegisterFormProps,
  SignUpFormData,
  SignUpSchema,
} from "@/modules/auth/schemas/signup.schemas";
import { useNotification } from "@/components/Providers/NotificationSnackbar";


type ApiError = {
  message?: string;
  errors?: Record<keyof SignUpFormData, string>;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await onRegister(data);
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.errors) {
        (
          Object.entries(apiError.errors) as Array<
            [keyof SignUpFormData, string]
          >
        ).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message,
          });
          showNotification(message, "warning");
        });
      } else {
        showNotification(
          apiError.message || "Erro ao processar o registro",
          "error"
        );
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: { xs: 3, sm: 4, md: 6 },
        bgcolor: "background.paper",
      }}
      noValidate
    >
      <RegisterHeader />

      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        error={!!errors.firstname}
        helperText={errors.firstname?.message}
        {...register("firstname")}
      />

      <TextField
        label="Sobrenome"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        error={!!errors.lastname}
        helperText={errors.lastname?.message}
        {...register("lastname")}
      />

      <TextField
        label="Nome de Usuário"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        error={!!errors.nickname}
        helperText={errors.nickname?.message}
        {...register("nickname")}
      />

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        size="small"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        label="Senha"
        showPassword={showPassword}
        onToggleVisibility={handleClickShowPassword}
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        label="Confirme a Senha"
        showPassword={showConfirmPassword}
        onToggleVisibility={handleClickShowConfirmPassword}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ py: 1.5, mb: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>

      <RegisterFooter />
    </Box>
  );
};
