import { z } from "zod";

import { validateEmail } from "./email-validator";

export const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
        message: "First letter must be uppercase",
      }),

    age: z.coerce.number().min(0, "Age cannot be negative"),

    email: z.string().trim().refine(validateEmail, {
      message: "Invalid email",
    }),

    gender: z.string().min(1, "Gender is required"),

    country: z.string().min(1, "Country is required"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Confirm password is required"),

    image: z.instanceof(FileList).refine((files) => files.length > 0, {
      message: "Image is required",
    }),

    terms: z.boolean().refine(Boolean, {
      message: "You must accept terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type FormValues = z.infer<typeof formSchema>;

export type FormInput = z.input<typeof formSchema>;
