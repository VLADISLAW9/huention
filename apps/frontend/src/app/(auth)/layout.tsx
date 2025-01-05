import type { ReactNode } from 'react';

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';

import { Layout } from './_components';

import '@mantine/core/styles.css';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!'
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default AuthLayout;
