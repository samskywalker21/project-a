import {createFileRoute} from '@tanstack/react-router';
import LoginPage from '../../../page/LoginPage';

export const Route = createFileRoute('/(app)/login/')({
  component: LoginPage,
});
