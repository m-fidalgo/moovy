import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F2911B',
    secondaryMain: '#A1A1A1',
    secondaryDark: '#000000',
    background: '#FFFFFF',
    error: '#FE6D8E',
    success: '#0ACF83',
  },
  fonts: {
    regular: 'Inter, sans-serif',
  },
};
