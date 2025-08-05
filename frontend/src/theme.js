import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00137F', // Deutsche Bank dark blue
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: "'Arial', sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#00137F',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#00137F',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
