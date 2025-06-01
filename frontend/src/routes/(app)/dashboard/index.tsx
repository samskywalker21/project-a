import {createFileRoute} from '@tanstack/react-router';
import DashboardPage from '../../../page/DashboardPage';

export const Route = createFileRoute('/(app)/dashboard/')({
  component: DashboardPage,
});
