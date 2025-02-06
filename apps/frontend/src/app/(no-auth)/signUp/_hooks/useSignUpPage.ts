import { redirect } from 'next/navigation';
import { useActionState } from 'react';

import { postAuthSignUp } from '@/utils/api/requests';
import { ROUTES } from '@/utils/constants';

import type { SignupFormState } from '../_constants';

import { SignupFormSchema } from '../_constants';

export const useSignUpPage = () => {
  const signUp = async (_: SignupFormState, formData: FormData) => {
    const signUpFormData = {
      email: formData.get('email'),
      password: formData.get('password'),
      username: formData.get('username'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      confirmPassword: formData.get('confirmPassword')
    };

    const validatedFields = SignupFormSchema.safeParse(signUpFormData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        data: signUpFormData
      };
    }

    const postAuthSignUpResponse = await postAuthSignUp({ params: validatedFields.data });

    if (!postAuthSignUpResponse.data.success) return;

    redirect(ROUTES.HOME);
  };

  const [signupFormState, signupFormAction, signupFormPending] = useActionState(signUp, undefined);

  return {
    state: { signupFormState, signupFormPending },
    functions: { signupFormAction }
  };
};
