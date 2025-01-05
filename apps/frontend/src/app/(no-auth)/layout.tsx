'use client';

import { Center, ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants';

const NoAuthLayout = ({ children }: { children: any }) => {
  const router = useRouter();

  useLayoutEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)) {
      router.push(ROUTES.HOME);
    }
  }, []);

  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link href='/favicon.svg' rel='shortcut icon' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default NoAuthLayout;
