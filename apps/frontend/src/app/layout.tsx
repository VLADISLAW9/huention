import type { ReactNode } from 'react';

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';

import { theme } from '../../theme';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

export const metadata = {
  title: 'Huention',
  description: 'Huention is notes app for you!'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
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
      <body>
        <MantineProvider theme={theme} forceColorScheme='dark'>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
