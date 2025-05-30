import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {Notifications} from '@mantine/notifications';
import Cover from './layout/Cover';
import LoginPage from './page/LoginPage';
import AppShellLayout from './layout/AppShellLayout';

const App = () => {
  return (
    <Cover>
      <Notifications />
      <AppShellLayout></AppShellLayout>
      {/* <LoginPage /> */}
    </Cover>
  );
};

export default App;
