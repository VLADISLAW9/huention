import type { ReactNode } from 'react';

import { AppShell, AppShellMain } from '@mantine/core';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { COOKIES_KEYS, ROUTES } from '@/utils/constants';

import { Header, Navbar } from './(components)/layout';

import '@mantine/core/styles.css';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const cookiesStore = await cookies();

  if (!cookiesStore.get(COOKIES_KEYS.ACCESS_TOKEN)) return redirect(ROUTES.SIGN_IN);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm'
      }}
      header={{ height: 60 }}
      padding='md'
    >
      <Header />
      <Navbar />
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
};

export default AuthLayout;
