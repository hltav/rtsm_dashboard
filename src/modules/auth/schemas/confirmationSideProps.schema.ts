import { z } from 'zod';

export const ConfirmationSidePropsSchema = z.object({
  onRedirectToLogin: z.custom<() => void>(), // ✅ tipagem manual
  status: z.enum(['loading', 'verified', 'invalid', 'error']),
  countdown: z.number().optional(),
});

export type ConfirmationSideProps = z.infer<typeof ConfirmationSidePropsSchema>;