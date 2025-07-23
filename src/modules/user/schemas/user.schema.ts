import { z } from "zod";

export const Role = z.enum(["USER", "ADMIN"]).optional();
export type Role = z.infer<typeof Role>;

export const AddressSchema = z.object({
  id: z.number().optional(),
  direction: z.string().nullable().optional(),
  houseNumber: z.number().nullable().optional(),
  neighborhood: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  clientDataId: z.number().optional(),
  createdAt: z.date().or(z.string()).optional(),
  updatedAt: z.date().or(z.string()).optional(),
});

export const ClientDataSchema = z.object({
  id: z.number().optional(),
  gender: z.string().optional(),
  cpf: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  userId: z.number().optional(),
  address: AddressSchema.nullable().optional(),
});

export const GetUserSchema = z.object({
  id: z.number(),
  firstname: z.string().default(""),
  lastname: z.string().default(""),
  nickname: z.string().default(""),
  email: z.string().email(),
  role: Role,
  clientData: ClientDataSchema.nullable().optional(),
  refreshToken: z.string().nullable().optional(),
});

export type Address = z.infer<typeof AddressSchema>;
export type ClientData = z.infer<typeof ClientDataSchema>;
export type GetUser = z.infer<typeof GetUserSchema>;
