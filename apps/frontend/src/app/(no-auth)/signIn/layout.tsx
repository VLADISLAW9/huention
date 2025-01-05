import { Center, ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

export const metadata = {
  title: 'Вход | Huention'
};

const SignInLayout = ({ children }: { children: any }) => {
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
        <Center h='100vh'>{children}</Center>
      </body>
    </html>
  );
};

export default SignInLayout;
