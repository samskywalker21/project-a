import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {Notifications} from '@mantine/notifications';
import {Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import ThemeProvider from './layout/ThemeProvider';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Notifications />
        <Outlet />
        {import.meta.env.VITE_APP_ENV === 'development' ? (
          <TanStackRouterDevtools />
        ) : null}
      </ThemeProvider>
    </>
  );
};

export default App;
