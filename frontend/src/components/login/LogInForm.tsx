import {Button, Stack, TextInput} from '@mantine/core';
import {
  IconUserHexagon,
  IconLockPassword,
  IconExclamationCircle,
} from '@tabler/icons-react';
import {useForm, zodResolver} from '@mantine/form';
import {z} from 'zod';
import axios from 'axios';
import {notifications} from '@mantine/notifications';
import {useAtomValue, useSetAtom} from 'jotai';
import userAtom from '../../atoms/UserAtom';
import {useNavigate} from '@tanstack/react-router';

const formSchema = z.object({
  username: z.string().min(1, {message: 'Username must not be empty'}),
  password: z.string().min(1, {message: 'Password must not be empty'}),
});

const LogInForm = () => {
  const user = useAtomValue(userAtom);
  const setUserAtom = useSetAtom(userAtom);
  const nav = useNavigate({from: '/login'});

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(formSchema),
  });

  const getProfile = async (access_token: string) => {
    try {
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      setUserAtom((prev: any) => ({...prev, ...data}));
      nav({to: '/dashboard'});
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch profile.',
        color: 'red',
        icon: <IconExclamationCircle />,
        position: 'top-left',
      });
    }
  };

  const submitHandler = async (values: {
    username: string;
    password: string;
  }) => {
    notifications.show({
      title: 'Signing in...',
      message: 'Please wait while we log you in.',
      withCloseButton: false,
      position: 'top-left',
      loading: true,
      id: 'login-progress',
      loaderProps: {color: 'green'},
    });

    try {
      const {data} = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        values,
      );
      setUserAtom((prev: any) => ({...prev, access_token: data.access_token}));
      await getProfile(data.access_token);
      notifications.update({
        id: 'login-progress',
        title: 'Success',
        message: 'Signed in successfully!',
        color: 'green',
        loading: false,
        autoClose: 2000,
      });
    } catch {
      notifications.update({
        id: 'login-progress',
        title: 'Failed',
        message: 'Incorrect username or password',
        color: 'red',
        icon: <IconExclamationCircle />,
        loading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        submitHandler(values);
        form.reset();
      })}
      autoComplete='off'
    >
      <Stack
        gap='md'
        w={{xs: '100%', sm: '150%', md: '150%'}}
      >
        <TextInput
          name='username'
          radius='md'
          label='Username'
          type='text'
          leftSection={<IconUserHexagon />}
          leftSectionPointerEvents='none'
          key={form.key('username')}
          {...form.getInputProps('username')}
          autoComplete='username'
        />
        <TextInput
          name='password'
          radius='md'
          label='Password'
          type='password'
          leftSection={<IconLockPassword />}
          leftSectionPointerEvents='none'
          key={form.key('password')}
          {...form.getInputProps('password')}
          autoComplete='current-password'
        />
        <Button
          type='submit'
          radius='md'
        >
          LOG IN
        </Button>
      </Stack>
    </form>
  );
};

export default LogInForm;
