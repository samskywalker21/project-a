import {AppShell, Group, Burger} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import type React from 'react';

const AppShellLayout = ({children}: {children: React.ReactNode}) => {
  const [opened, {toggle}] = useDisclosure();

  return (
    <AppShell
      header={{height: {base: 60, md: 70, lg: 80}}}
      navbar={{
        width: {base: 200, md: 300, lg: 400},
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
      <AppShell.Navbar p='md'>Navbar</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppShellLayout;
