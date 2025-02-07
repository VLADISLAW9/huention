import { z } from 'zod';

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Введите действительный адрес электронной почты.' }).trim(),
  password: z.string().min(1, { message: 'Пароль должен содержать не менее 8 символов.' }).trim()
});

export type SigninFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      data?: {
        email: FormDataEntryValue | null;
        password: FormDataEntryValue | null;
      };
      message?: string;
    }
  | undefined;
