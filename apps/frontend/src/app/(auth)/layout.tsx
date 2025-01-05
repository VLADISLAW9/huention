import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';

import { theme } from '../../../theme';
import { Layout } from './_components';

import '@mantine/core/styles.css';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!'
};

const AuthLayout = ({ children }: { children: any }) => {
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
          <Layout>{children}</Layout>
        </MantineProvider>
      </body>
    </html>
  );
};

export default AuthLayout;
