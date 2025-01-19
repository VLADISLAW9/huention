'use client';
import { AppShell, AppShellMain } from '@mantine/core';
import { redirect } from 'next/navigation';
import { type ReactNode, useLayoutEffect } from 'react';

import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants';

import { Header, Navbar } from './(components)/layout';

import '@mantine/core/styles.css';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  useLayoutEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)) {
      redirect(ROUTES.SIGN_IN);
    }
  }, []);

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
