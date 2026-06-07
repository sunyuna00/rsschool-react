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
      .refine(validateEmail, {
      message: 'Invalid email',
    }),

    gender: z.string().min(1, 'Gender is required'),
    country: z.string().min(1, 'Country is required'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),

    confirmPassword: z
      .string()
      .min(1, 'Confirm password is required'),

    terms: z.boolean().refine((v) => v, {
      message: 'You must accept terms',
    }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    },
  );