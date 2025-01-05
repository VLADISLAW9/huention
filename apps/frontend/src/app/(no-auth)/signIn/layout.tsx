import type { ReactNode } from 'react';

import { Center } from '@mantine/core';

export const metadata = {
  title: 'Вход | Huention'
};

interface SignInLayoutProps {
  children: ReactNode;
}

const SignInLayout = ({ children }: SignInLayoutProps) => {
  return <Center h='100vh'>{children}</Center>;
};

export default SignInLayout;
