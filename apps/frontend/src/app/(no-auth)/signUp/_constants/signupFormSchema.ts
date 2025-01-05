import { z } from 'zod';

export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  username: z.string().min(2, { message: 'Username must be at least 2 characters long.' }).trim(),
  firstName: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  lastName: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  password: z.string().min(1, { message: 'Be at least 8 characters long' }).trim(),
  confirmPassword: z.string().min(1, { message: 'Be at least 8 characters long' }).trim()
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
