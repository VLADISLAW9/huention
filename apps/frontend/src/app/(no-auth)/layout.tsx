'use client';

import type { ReactNode } from 'react';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants';

const NoAuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useLayoutEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)) {
      router.push(ROUTES.HOME);
    }
  }, []);

  return children;
};

export default NoAuthLayout;
