import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  username: z.string().min(2, { message: 'Username must be at least 2 characters long.' }).trim(),
  firstName: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  lastName: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-z]/i, { message: 'Contain at least one letter.' })
    .regex(/\d/, { message: 'Contain at least one number.' })
    .regex(/[^a-z0-9]/i, {
      message: 'Contain at least one special character.'
    })
    .trim(),
  confirmPassword: z.string().min(8, { message: 'Be at least 8 characters long' }).trim()
});

export type SignupFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        username?: string[];
        name?: string[];
        confirmPassword?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
