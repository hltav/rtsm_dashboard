// export const validateCPF = (
//   cpf: string
// ): {
//   isValid: boolean;
//   formatted?: string;
//   cleaned?: string;
// } => {
//   // Remove todos os caracteres não numéricos
//   const cleanedCPF = cpf.replace(/[^\d]/g, "");

//   // Verifica se tem 11 dígitos
//   if (cleanedCPF.length !== 11) {
//     return { isValid: false };
//   }

//   // Verifica se é uma sequência de dígitos repetidos
//   if (/^(\d)\1{10}$/.test(cleanedCPF)) {
//     return { isValid: false };
//   }

//   // Validação do primeiro dígito verificador
//   let sum = 0;
//   for (let i = 0; i < 9; i++) {
//     sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
//   }
//   let remainder = 11 - (sum % 11);
//   if (remainder === 10 || remainder === 11) remainder = 0;
//   if (remainder !== parseInt(cleanedCPF.charAt(9))) {
//     return { isValid: false };
//   }

//   // Validação do segundo dígito verificador
//   sum = 0;
//   for (let i = 0; i < 10; i++) {
//     sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
//   }
//   remainder = 11 - (sum % 11);
//   if (remainder === 10 || remainder === 11) remainder = 0;

//   // Formata o CPF válido
//   const formattedCPF = cleanedCPF.replace(
//     /(\d{3})(\d{3})(\d{3})(\d{2})/,
//     "$1.$2.$3-$4"
//   );

//   return {
//     isValid: remainder === parseInt(cleanedCPF.charAt(10)),
//     formatted: formattedCPF,
//     cleaned: cleanedCPF,
//   };
// };

import { z } from "zod";

export const cpfSchema = z
  .string()
  .nonempty("CPF é obrigatório")
  .refine((cpf) => {
    // Função de validação (igual a sua)
    const cleanedCPF = cpf.replace(/[^\d]/g, "");
    if (cleanedCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanedCPF)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanedCPF.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;

    return remainder === parseInt(cleanedCPF.charAt(10));
  }, {
    message: "CPF inválido",
  });
