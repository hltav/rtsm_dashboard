import { z } from "zod";
import { CreateAddressDTOSchema } from "./createAddress.schema";

export const CreateClientDataDTO = z.object({
  gender: z.string().optional(),
  cpf: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  userId: z.number().optional(),
  address: CreateAddressDTOSchema.optional(),
});

export type CreateClientDataDTO = z.infer<typeof CreateClientDataDTO>;
