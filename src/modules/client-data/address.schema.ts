import { z } from "zod";

export const AddressSchema = z.object({
  id: z.number().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  clientDataId: z.number().optional(),
});

export type Address = z.infer<typeof AddressSchema>;
