export const formatCPFInput = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11); // limita a 11 dígitos
  const part1 = digits.substring(0, 3);
  const part2 = digits.substring(3, 6);
  const part3 = digits.substring(6, 9);
  const part4 = digits.substring(9, 11);

  let formatted = part1;
  if (part2) formatted += "." + part2;
  if (part3) formatted += "." + part3;
  if (part4) formatted += "-" + part4;

  return formatted;
};
