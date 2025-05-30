import {
  createTheme,
  MantineProvider,
  localStorageColorSchemeManager,
} from '@mantine/core';

const theme = createTheme({
  focusRing: 'auto',
  colors: {
    themePurple: [
      '#f6eeff',
      '#e7d9f7',
      '#cab1ea',
      '#ad86dd',
      '#9462d2',
      '#854bcb',
      '#7d3fc9',
      '#6b31b2',
      '#5f2ba0',
      '#52238d',
    ],
    themeGreen: [
      '#e6ffee',
      '#d3f9e0',
      '#a8f2c0',
      '#7aea9f',
      '#54e382',
      '#3bdf70',
      '#2bdd66',
      '#1bc455',
      '#0bae4a',
      '#00973c',
    ],
  },
  primaryColor: 'themePurple',
  primaryShade: 7,
  autoContrast: true,
  breakpoints: {
    xs: '40rem',
    sm: '48rem',
    md: '64rem',
    lg: '80rem',
    xl: '96rem',
  },
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'color-scheme',
});

const Cover = ({children}: {children: React.ReactNode}) => {
  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme='dark'
    >
      {children}
    </MantineProvider>
  );
};

export default Cover;
