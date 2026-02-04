import z from "zod";

export const Result = z.enum([
  "pending",
  "win",
  "lose",
  "draw",
  "cashout",
  "returned",
  "void",
  "half_win",
  "half_lose",
]);

export type Result = z.infer<typeof Result>;
