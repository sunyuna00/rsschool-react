import { z } from 'zod';
import { validateEmail } from './email-validator';

export const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, {
        message: 'First letter must be uppercase',
      }),

    age: z.coerce
      .number()
      .min(0, 'Age cannot be negative'),

    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .refine(validateEmail, {
        message: 'Invalid email',
      }),

    gender: z
      .string()
      .min(1, 'Please select a gender'),

    country: z
      .string()
      .min(1, 'Please select a country'),

    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .regex(/[A-Z]/, {
        message: 'Password must contain an uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain a lowercase letter',
      })
      .regex(/\d/, {
        message: 'Password must contain a digit',
      }),

    confirmPassword: z.string(),

    terms: z.boolean().refine((value) => value, {
      message: 'You must accept the terms',
    }),

    image: z.instanceof(File).optional(),
  })
  .refine(
    ({ password, confirmPassword }) =>
      password === confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    }
  );

export type FormValues = z.infer<typeof formSchema>;