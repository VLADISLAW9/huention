'use client';

import type { ReactNode } from 'react';

import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants';

const NoAuthLayout = ({ children }: { children: ReactNode }) => {
  useLayoutEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)) {
      redirect(ROUTES.HOME);
    }
  }, []);

  return children;
};

export default NoAuthLayout;
