import {Button, Stack, TextInput} from '@mantine/core';
import {
  IconUserHexagon,
  IconLockPassword,
  IconExclamationCircle,
} from '@tabler/icons-react';
import {useForm} from '@mantine/form';
import {z} from 'zod';
import {zodResolver} from '@mantine/form';
import axios from 'axios';
import {notifications} from '@mantine/notifications';
import {useSetAtom} from 'jotai';
import {useResetAtom} from 'jotai/utils';
import userAtom from '../../atoms/UserAtom';

const formSchema = z.object({
  username: z.string().min(1, {message: 'Username must not be empty'}),
  password: z.string().min(1, {message: 'Password must not be empty'}),
});

const LogInForm = () => {
  const setUserAtom = useSetAtom(userAtom);
  const resetUserAtom = useResetAtom(userAtom);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(formSchema),
  });

  const submitHandler = async (values: {
    username: string;
    password: string;
  }) => {
    const data = await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, values)
      .then((res) => {
        const {name, position, section} = res.data;
        setUserAtom({name, position, section});
        notifications.show({
          title: 'Success',
          message: 'Signing in...',
          withCloseButton: false,
          position: 'top-left',
          loading: true,
          loaderProps: {color: 'green'},
        });
      })
      .catch((res) => {
        notifications.show({
          title: 'Failed',
          message: 'Incorrect username or password',
          withCloseButton: false,
          position: 'top-left',
          icon: <IconExclamationCircle />,
          color: 'red',
        });
        resetUserAtom();
      });
  };

  return (
    <form
      onSubmit={form.onSubmit(
        (values: {username: string; password: string}) => {
          submitHandler(values);
          form.reset();
        },
      )}
    >
      <Stack
        gap={'md'}
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
        />
        <Button
          type='submit'
          radius={'md'}
        >
          LOG IN
        </Button>
      </Stack>
    </form>
  );
};

export default LogInForm;
