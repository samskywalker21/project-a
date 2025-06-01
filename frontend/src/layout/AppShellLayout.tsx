import {AppShell, Group, Burger} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import type React from 'react';
import MenuComponent from '../components/MenuComponent';

const AppShellLayout = ({children}: {children: React.ReactNode}) => {
  const [opened, {toggle}] = useDisclosure();

  return (
    <AppShell
      header={{height: {base: 50, md: 60, lg: 70}}}
      navbar={{
        width: {base: 100, md: 150, lg: 200},
        breakpoint: 'sm',
        collapsed: {mobile: !opened},
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group
          h='100%'
          px='md'
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom='sm'
            size='sm'
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <MenuComponent />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppShellLayout;
