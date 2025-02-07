'use client';

import {
  Anchor,
  Button,
  Card,
  Center,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import Link from 'next/link';

import { ROUTES } from '@/utils/constants';

import { useSignInPage } from './(hooks)';

const SignInPage = () => {
  const { state, functions } = useSignInPage();

  return (
    <Card p='xl'>
      <Stack gap='xl'>
        <Title size='h3'>Вход</Title>
        <form action={functions.signinFormAction}>
          <Stack w='400px'>
            <TextInput
              defaultValue={state.signinFormState?.data.email?.toString()}
              id='email'
              label={<Text mb='xs'>Почта</Text>}
              name='email'
              error={state.signinFormState?.errors?.email}
              placeholder='Введите вашу почту...'
            />
            <PasswordInput
              defaultValue={state.signinFormState?.data.password?.toString()}
              id='password'
              label={<Text mb='xs'>Пароль</Text>}
              name='password'
              error={state.signinFormState?.errors?.password}
              placeholder='Введите ваш пароль...'
            />
          </Stack>
          <Center>
            <Stack>
              <Button mt='xl' type='submit' loading={state.signinFormPending}>
                Войти
              </Button>
              <Anchor href={ROUTES.SIGN_UP} ta='center' component={Link}>
                Нету аккаунта?
              </Anchor>
            </Stack>
          </Center>
        </form>
      </Stack>
    </Card>
  );
};
export default SignInPage;
