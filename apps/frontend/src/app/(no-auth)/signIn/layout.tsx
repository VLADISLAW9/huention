import type { ReactNode } from 'react';

import { Center } from '@mantine/core';

export const metadata = {
  title: 'Вход | Huention'
};

const SignUpLayout = ({ children }: { children: ReactNode }) => {
  return <Center h='100vh'>{children}</Center>;
};

export default SignUpLayout;
