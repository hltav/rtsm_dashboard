"use client";
import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { BankrollFormModalProps } from "../interface/bankrollFormModalProps";

export const BankrollFormModal = ({
  open,
  onClose,
  bankroll,
  onChange,
  onSave,
}: BankrollFormModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "#1A2B42",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: "#FFFFFF" }}>
          Adicionar Nova Banca
        </Typography>
        <TextField
          label="Nome da Banca"
          name="name"
          value={bankroll.name}
          onChange={onChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            sx: {
              color: "#FFFFFF",
              "&.Mui-focused": { color: "#FFFFFF" },
            },
          }}
          InputProps={{
            sx: {
              color: "#FFFFFF",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FFFFFF" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFFFFF",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFFFFF",
              },
            },
          }}
        />
        <TextField
          label="Saldo (R$)"
          name="balance"
          value={bankroll.balance}
          onChange={onChange}
          fullWidth
          variant="outlined"
          type="number"
          inputProps={{ step: "0.01" }}
          InputLabelProps={{
            sx: {
              color: "#FFFFFF",
              "&.Mui-focused": { color: "#FFFFFF" },
            },
          }}
          InputProps={{
            sx: {
              color: "#FFFFFF",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FFFFFF" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFFFFF",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFFFFF",
              },
            },
          }}
        />
        <TextField
          label="Valor por Unid"
          name="unidValue"
          value={bankroll.unidValue}
          onChange={onChange}
          fullWidth
          variant="outlined"
          type="number"
          inputProps={{ step: "0.01" }}
          InputLabelProps={{
            sx: {
              color: "#FFFFFF",
              "&.Mui-focused": { color: "#FFFFFF" },
            },
          }}
          InputProps={{
            sx: {
              color: "#FFFFFF",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FFFFFF" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFFFFF",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFFFFF",
              },
            },
          }}
        />
        <TextField
          label="Casa de Apostas"
          name="bookmaker"
          value={bankroll.bookmaker}
          onChange={onChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            sx: {
              color: "#FFFFFF",
              "&.Mui-focused": { color: "#FFFFFF" },
            },
          }}
          InputProps={{
            sx: {
              color: "#FFFFFF",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FFFFFF" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFFFFF",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFFFFF",
              },
            },
          }}
        />
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "#FFFFFF",
              borderColor: "#FFFFFF",
              "&:hover": { borderColor: "#FFFFFF", opacity: 0.8 },
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={onSave}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
