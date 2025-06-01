import {createFileRoute, redirect} from '@tanstack/react-router';

const isAuthenticated = () => {
  const data = sessionStorage.getItem('user');
  if (!data || data === undefined || data === null) {
    return false;
  } else {
    return true;
  }
};

export const Route = createFileRoute('/')({
  beforeLoad: async ({location}) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
