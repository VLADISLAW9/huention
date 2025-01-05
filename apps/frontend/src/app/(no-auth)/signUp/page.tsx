'use client';
import { Button, Card, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';

import { useSignUpPage } from './_hooks';

const SignUpPage = () => {
  const { state, functions } = useSignUpPage();

  return (
    <Card p='xl'>
      <Stack gap='xl'>
        <Title size='h3'>Регистрация</Title>
        <form action={functions.signupFormAction}>
          <Stack w='400px'>
            <TextInput
              id='email'
              label={<Text mb='xs'>Почта</Text>}
              name='email'
              error={state.signupFormState?.errors.email}
              placeholder='Введите вашу почту...'
            />
            <TextInput
              id='username'
              label={<Text mb='xs'>Никнейм</Text>}
              name='username'
              error={state.signupFormState?.errors.username}
              placeholder='Введите ваш никнейм...'
            />
            <TextInput
              id='firstName'
              label={<Text mb='xs'>Имя</Text>}
              name='firstName'
              error={state.signupFormState?.errors.firstName}
              placeholder='Введите вашу имя...'
            />
            <TextInput
              id='lastName'
              label={<Text mb='xs'>Фамилия</Text>}
              name='lastName'
              error={state.signupFormState?.errors.lastName}
              placeholder='Введите вашу фамилию...'
            />
            <PasswordInput
              id='password'
              label={<Text mb='xs'>Пароль</Text>}
              name='password'
              error={state.signupFormState?.errors.password}
              placeholder='Введите ваш пароль...'
            />
            <PasswordInput
              id='confirmPassword'
              label={<Text mb='xs'>Подтверждение пароля</Text>}
              name='confirmPassword'
              error={state.signupFormState?.errors.confirmPassword}
              placeholder='Введите ваш пароль снова...'
            />
          </Stack>
          <Button mt='xl' type='submit' loading={state.signupFormPending}>
            Зарегистрироваться
          </Button>
        </form>
      </Stack>
    </Card>
  );
};
export default SignUpPage;
