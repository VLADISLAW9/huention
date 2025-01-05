import { AppShell, AppShellMain } from '@mantine/core';
import { ReactNode } from 'react';

import { Header, Navbar } from './components';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
