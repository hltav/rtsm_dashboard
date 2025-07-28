import { z } from "zod";

export const UpdateAddressSchema = z
  .object({
    id: z.number().optional(),
    neighborhood: z.string().nullish(),
    city: z.string().nullish(),
    state: z.string().nullish(),
    clientDataId: z.number().optional(),
  })
  .optional();

export const UpdateClientDataSchema = z.object({
  id: z.number().optional(),
  gender: z.string().optional(),
  cpf: z.string().optional(),
  image: z.string().url().optional(),
  phone: z.string().optional(),
  userId: z.number().optional(),
  address: UpdateAddressSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UpdateClientData = z.infer<typeof UpdateClientDataSchema>;
