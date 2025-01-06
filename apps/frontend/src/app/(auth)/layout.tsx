'use client';

import { redirect } from 'next/navigation';
import { type ReactNode, useLayoutEffect } from 'react';

import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants';

import { Layout } from './_components';

import '@mantine/core/styles.css';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  useLayoutEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)) {
      redirect(ROUTES.SIGN_IN);
    }
  }, []);

  return <Layout>{children}</Layout>;
};

export default AuthLayout;
