import { AppShellHeader } from '@mantine/core';
import Link from 'next/link';

import { Logotype } from '@/app/(components)';

export const Header = () => (
  <AppShellHeader p='md'>
    <Link href='/home'>
      <Logotype />
    </Link>
  </AppShellHeader>
);
