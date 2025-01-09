import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username wajib diisi" }).trim(),
  password: z.string().min(1, { message: "Password wajib diisi" }),
});

export type LoginType = z.infer<typeof loginSchema>;
