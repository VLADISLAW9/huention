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

import { useSignUpPage } from './(hooks)';

const SignUpPage = () => {
  const { state, functions } = useSignUpPage();

  return (
    <Card p='xl'>
      <Stack gap='xl'>
        <Title size='h3'>Регистрация</Title>
        <form action={functions.signupFormAction}>
          <Stack w='400px'>
            <TextInput
              defaultValue={state.signupFormState?.data.email?.toString()}
              id='email'
              label={<Text mb='xs'>Почта</Text>}
              name='email'
              error={state.signupFormState?.errors.email}
              placeholder='Введите вашу почту...'
            />
            <TextInput
              defaultValue={state.signupFormState?.data.username?.toString()}
              id='username'
              label={<Text mb='xs'>Никнейм</Text>}
              name='username'
              error={state.signupFormState?.errors.username}
              placeholder='Введите ваш никнейм...'
            />
            <TextInput
              defaultValue={state.signupFormState?.data.firstName?.toString()}
              id='firstName'
              label={<Text mb='xs'>Имя</Text>}
              name='firstName'
              error={state.signupFormState?.errors.firstName}
              placeholder='Введите вашу имя...'
            />
            <TextInput
              defaultValue={state.signupFormState?.data.lastName?.toString()}
              id='lastName'
              label={<Text mb='xs'>Фамилия</Text>}
              name='lastName'
              error={state.signupFormState?.errors.lastName}
              placeholder='Введите вашу фамилию...'
            />
            <PasswordInput
              defaultValue={state.signupFormState?.data.password?.toString()}
              id='password'
              label={<Text mb='xs'>Пароль</Text>}
              name='password'
              error={state.signupFormState?.errors.password}
              placeholder='Введите ваш пароль...'
            />
            <PasswordInput
              defaultValue={state.signupFormState?.data.confirmPassword?.toString()}
              id='confirmPassword'
              label={<Text mb='xs'>Подтверждение пароля</Text>}
              name='confirmPassword'
              error={state.signupFormState?.errors.confirmPassword}
              placeholder='Введите ваш пароль снова...'
            />
          </Stack>
          <Center>
            <Stack>
              <Button mt='xl' type='submit' loading={state.signupFormPending}>
                Зарегистрироваться
              </Button>
              <Anchor href={ROUTES.SIGN_IN} ta='center' component={Link}>
                Уже есть аккаунт?
              </Anchor>
            </Stack>
          </Center>
        </form>
      </Stack>
    </Card>
  );
};
export default SignUpPage;
