import { z } from "zod";

export const EditableUserDataSchema = z.object({
  cpf: z.string(),
  gender: z.string(),
  phone: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
});

export type EditableUserData = z.infer<typeof EditableUserDataSchema>;

export const IBGEStateSchema = z.object({
  sigla: z.string(),
  nome: z.string(),
});

export type IBGEState = z.infer<typeof IBGEStateSchema>;

export const IBGECitySchema = z.object({
  nome: z.string(),
});

export type IBGECity = z.infer<typeof IBGECitySchema>;

export interface EditableUserInfoProps extends EditableUserData {
  onCpfChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onNeighborhoodChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStateChange: (value: string) => void;
}
