import type { ReactNode } from 'react';

import { Center } from '@mantine/core';

export const metadata = {
  title: 'Регистрация | Huention'
};

interface SignUpLayoutProps {
  children: ReactNode;
}

const SignUpLayout = ({ children }: SignUpLayoutProps) => {
  return <Center h='100vh'>{children}</Center>;
};

export default SignUpLayout;
