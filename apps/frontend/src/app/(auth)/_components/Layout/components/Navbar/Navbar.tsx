import { AppShellNavbar, NavLink } from '@mantine/core';

import { useNavbar } from './hooks';

export const Navbar = () => {
  const { state } = useNavbar();

  return (
    <AppShellNavbar>
      {state.navLinks.map((navLink, index) => (
        <NavLink key={index} {...navLink} />
      ))}
    </AppShellNavbar>
  );
};
