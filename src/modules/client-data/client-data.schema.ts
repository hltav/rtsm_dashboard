import { z } from "zod";
import { AddressSchema } from "./address.schema";

export const ClientDataSchema = z.object({
  id: z.number().optional(),
  gender: z.string().optional(),
  cpf: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  userId: z.number().optional(),
  address: AddressSchema,
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ClientImageResponseSchema = z.object({
  id: z.number(),
  image: z.string().url().optional(),
  updatedAt: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
});

export type ClientImageResponse = z.infer<typeof ClientImageResponseSchema>;

export type ClientData = z.infer<typeof ClientDataSchema>;
