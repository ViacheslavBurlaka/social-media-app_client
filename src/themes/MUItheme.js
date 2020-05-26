import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  formStyles: {
    form: {
      textAlign: 'center',
    },
    textField: {
      marginBottom: 16,
    },
    button: {
      marginBottom: 16,
    },
    icon: {
      marginBottom: 16,
    },
    pageTitle: {
      marginBottom: 16,
    },
    customError: {
      color: 'red',
      fontSize: '0.75rem',
      marginBottom: 16,
    },
  },
});
