// export const formatPhone = (value: string) => {
//   // Remove tudo que não for número e limita a 11 dígitos
//   const digits = value.replace(/\D/g, "").slice(0, 11);

//   const ddd = digits.substring(0, 2);
//   const firstDigit = digits.substring(2, 3);
//   const middle = digits.substring(3, 7);
//   const last = digits.substring(7, 11);

//   let formatted = "";
//   if (ddd) formatted += `(${ddd}) `;
//   if (firstDigit) formatted += `${firstDigit} `;
//   if (middle) formatted += `${middle}-`;
//   if (last) formatted += last;

//   return formatted.trim();
// };

export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};
