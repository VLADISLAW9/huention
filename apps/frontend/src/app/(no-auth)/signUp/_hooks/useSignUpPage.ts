import { useActionState } from 'react';

import { postAuthSignUp } from '@/utils/api/requests';

import type { SignupFormState } from '../_constants';

import { SignupFormSchema } from '../_constants';

export const useSignUpPage = () => {
  async function signup(_: SignupFormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      username: formData.get('username'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      confirmPassword: formData.get('confirmPassword')
    });

    console.log('formData', formData);
    console.log('validatedFields', validatedFields);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors
      };
    }

    const postAuthSignUpResponse = await postAuthSignUp({ params: validatedFields.data });

    console.log(postAuthSignUpResponse);
  }

  const [signupFormState, signupFormAction, signupFormPending] = useActionState(signup, undefined);

  return {
    state: { signupFormState, signupFormPending },
    functions: { signupFormAction }
  };
};
