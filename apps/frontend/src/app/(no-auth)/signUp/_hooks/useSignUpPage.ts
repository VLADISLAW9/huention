import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

import { postAuthSignUp } from '@/utils/api/requests';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants';

import type { SignupFormState } from '../_constants';

import { SignupFormSchema } from '../_constants';

export const useSignUpPage = () => {
  const router = useRouter();

  async function signUp(_: SignupFormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      username: formData.get('username'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      confirmPassword: formData.get('confirmPassword')
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors
      };
    }

    const postAuthSignUpResponse = await postAuthSignUp({ params: validatedFields.data });

    if (!postAuthSignUpResponse.data.data.success) return;

    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, postAuthSignUpResponse.data.data.accessToken);
    router.push(ROUTES.HOME);
  }

  const [signupFormState, signupFormAction, signupFormPending] = useActionState(signUp, undefined);

  return {
    state: { signupFormState, signupFormPending },
    functions: { signupFormAction }
  };
};
