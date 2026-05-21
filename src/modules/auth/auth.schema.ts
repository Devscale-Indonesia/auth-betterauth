import z from "zod";

export const RegisterInputSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8).max(32),
});

export const LoginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(32),
});
