import {Container, Flex, Title} from '@mantine/core';
import LogInForm from '../components/login/LogInForm';

const LoginPage = () => {
  return (
    <Container
      fluid
      h='100%'
    >
      <Flex
        align={{xs: 'center', sm: 'flex-start'}}
        direction={'column'}
        justify={'center'}
        gap={'md'}
        pt={'15%'}
        pl={{sm: '5%'}}
      >
        <Title>Task Tracker</Title>
        <LogInForm />
      </Flex>
    </Container>
  );
};

export default LoginPage;
