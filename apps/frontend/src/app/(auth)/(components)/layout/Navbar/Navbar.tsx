'use client';

import { AppShellNavbar, Button, NavLink, Stack, Text, TextInput, Tree } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { RenderTreeNode } from './components';
import { useNavbar } from './hooks';

export const Navbar = () => {
  const { state, functions } = useNavbar();

  return (
    <AppShellNavbar>
      {state.navLinks.map((navLink, index) => (
        <NavLink key={index} {...navLink} />
      ))}
      <Stack px='lg' py='md'>
        <Text c='dimmed' size='sm'>
          Коллекции
        </Text>
        {!state.showAddCollectionField && (
          <Button
            c='dimmed'
            justify='start'
            p={0}
            size='compact-xs'
            variant='transparent'
            leftSection={<IconPlus size={20} />}
            onClick={() => functions.toggleShowAddCollectionField()}
          >
            Новая коллекция
          </Button>
        )}
        {state.showAddCollectionField && (
          <TextInput
            {...state.collectionNameInput.register()}
            autoFocus
            onBlur={functions.onCollectionNameInputBlur}
            placeholder='Введите имя коллекции...'
          />
        )}
        <Tree data={state.collectionItems} expandOnClick={false} renderNode={RenderTreeNode} />
      </Stack>
    </AppShellNavbar>
  );
};
