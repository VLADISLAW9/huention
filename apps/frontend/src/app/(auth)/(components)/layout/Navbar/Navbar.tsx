'use client';

import { AppShellNavbar, NavLink, Stack, Text, Tree } from '@mantine/core';

import { RenderTreeNode } from './components';
import { useNavbar } from './hooks';

export const Navbar = () => {
  const { state } = useNavbar();

  return (
    <AppShellNavbar>
      {state.navLinks.map((navLink, index) => (
        <NavLink key={index} {...navLink} />
      ))}
      <Stack px='lg' py='md'>
        <Text c='dimmed' size='sm'>
          Коллекции
        </Text>
        <Tree data={state.collectionItems} expandOnClick={false} renderNode={RenderTreeNode} />
      </Stack>
    </AppShellNavbar>
  );
};
