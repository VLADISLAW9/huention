import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar } from '@mantine/core';
import { ReactNode } from 'react';

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
      <AppShellHeader p='md'>Header</AppShellHeader>
      <AppShellNavbar p='md'>AppShellNavbar</AppShellNavbar>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
};
