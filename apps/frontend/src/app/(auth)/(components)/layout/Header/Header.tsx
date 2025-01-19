import { ActionIcon, AppShellHeader, Box } from '@mantine/core';
import { IconAlphabetHebrew } from '@tabler/icons-react';
import Link from 'next/link';

export const Header = () => {
  return (
    <AppShellHeader p='md'>
      <Link href='/home'>
        <ActionIcon variant='white'>
          <IconAlphabetHebrew />
        </ActionIcon>
      </Link>
    </AppShellHeader>
  );
};
