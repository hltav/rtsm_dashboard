import { z } from "zod";

export const CreateAddressDTOSchema = z.object({
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  clientDataId: z.number().optional(),
});

export type CreateAddressDTO = z.infer<typeof CreateAddressDTOSchema>;