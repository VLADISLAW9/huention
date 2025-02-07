import { z } from 'zod';

export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Введите действительный адрес электронной почты.' }).trim(),
  username: z
    .string()
    .min(2, { message: 'Имя пользователя должно содержать не менее 2 символов.' })
    .trim(),
  firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2 символов.' }).trim(),
  lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2 символов.' }).trim(),
  password: z.string().min(1, { message: 'Пароль должен содержать не менее 8 символов.' }).trim(),
  confirmPassword: z
    .string()
    .min(1, { message: 'Пароль должен содержать не менее 8 символов.' })
    .trim()
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
      data?: {
        email: FormDataEntryValue | null;
        username: FormDataEntryValue | null;
        firstName: FormDataEntryValue | null;
        lastName: FormDataEntryValue | null;
        password: FormDataEntryValue | null;
        confirmPassword: FormDataEntryValue | null;
      };
      message?: string;
    }
  | undefined;
