import { redirect } from 'next/navigation';
import { useActionState } from 'react';

import { postAuthSignIn } from '@/utils/api/requests';
import { ROUTES } from '@/utils/constants';

import { SigninFormSchema, type SigninFormState } from '../_constants';

export const useSignInPage = () => {
  const signIn = async (_: SigninFormState, formData: FormData) => {
    const signInFormData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    const validatedFields = SigninFormSchema.safeParse(signInFormData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        data: signInFormData
      };
    }

    const postAuthSignInResponse = await postAuthSignIn({
      params: validatedFields.data,
      config: { credentials: 'include' }
    });

    if (!postAuthSignInResponse.data.success) {
      return {
        data: signInFormData
      };
    }

    redirect(ROUTES.HOME);
  };

  const [signinFormState, signinFormAction, signinFormPending] = useActionState(signIn, undefined);

  return {
    state: { signinFormState, signinFormPending },
    functions: { signinFormAction }
  };
};
