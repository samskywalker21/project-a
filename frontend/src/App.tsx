import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import {Notifications} from '@mantine/notifications';

import Cover from './layout/Cover';
import LoginPage from './page/LoginPage';

const App = () => {
  return (
    <Cover>
      <Notifications />
      <LoginPage />
    </Cover>
  );
};

export default App;
