import { NavLinkProps } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import Link from 'next/link';

import { ROUTES } from '@/utils/constants';

export const useNavbar = () => {
  const navLinks = [
    {
      label: 'Главная',
      component: Link,
      href: ROUTES.HOME,
      px: 'lg',
      py: 'md',
      leftSection: <IconHome size={18} />
    } as NavLinkProps
  ];

  return {
    state: { navLinks }
  };
};
