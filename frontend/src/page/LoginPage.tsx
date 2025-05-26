import {Container} from '@mantine/core';
import {useViewportSize} from '@mantine/hooks';

const LoginPage = () => {
  const {height, width} = useViewportSize();

  return (
    <Container
      fluid
      h={height}
      style={{borderWidth: 1, borderStyle: 'solid'}}
    >
      {height}
    </Container>
  );
};

export default LoginPage;
