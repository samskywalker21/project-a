import {AppShell} from '@mantine/core';
import type React from 'react';

const AppShellLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <AppShell>
      <AppShell.Header>Header</AppShell.Header>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppShellLayout;
