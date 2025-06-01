import AppShellLayout from '../layout/AppShellLayout';
import {Outlet} from '@tanstack/react-router';

const DashboardPage = () => {
  return (
    <AppShellLayout>
      <Outlet />
    </AppShellLayout>
  );
};

export default DashboardPage;
