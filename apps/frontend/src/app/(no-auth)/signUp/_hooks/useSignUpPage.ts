import { useActionState } from 'react';

import { SignupFormSchema, SignupFormState } from '../_constants';

export const useSignUpPage = () => {
  async function signup(state: SignupFormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      username: formData.get('username'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      confirmPassword: formData.get('confirmPassword')
    });

    console.log(validatedFields, formData, state);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors
      };
    }
  }

  const [signupFormState, signupFormAction, signupFormPending] = useActionState(signup, undefined);

  return {
    state: { signupFormState, signupFormPending },
    functions: { signupFormAction }
  };
};
