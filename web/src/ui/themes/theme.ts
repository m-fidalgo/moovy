import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F2911B',
    },
    secondary: {
      main: '#A1A1A1',
      dark: '#000000',
    },
    background: {
      default: '#DCE0E2',
    },
    error: {
      main: '#FE6D8E',
    },
    success: {
      main: '#0ACF83',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default theme;
