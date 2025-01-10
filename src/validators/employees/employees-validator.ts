import { z } from "zod";

export const employeeSchema = z.object({
  division: z.string().min(1, { message: "Divisi wajib diisi" }),
  name: z
    .string()
    .min(1, { message: "Nama wajib diisi" })
    .max(255, { message: "Nama maksimal 255 karakter" }),
  phone: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
  position: z.string().min(1, { message: "Posisi wajib diisi" }),
  image: z
    .union([
      z.string().nullable().optional(),
      z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
              file.type
            ),
          {
            message: "Gambar harus berformat jpeg, png, jpg, atau gif",
          }
        )
        .refine((file) => file.size <= 2048 * 1024, {
          message: "Ukuran gambar maksimal 2MB",
        }),
    ])
    .optional(),
});

export type EmployeType = z.infer<typeof employeeSchema>;
