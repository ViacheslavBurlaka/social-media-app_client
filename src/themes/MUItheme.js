import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  // Navbar
  navbar: {
    container: {
      margin: '0 auto',
      '& svg': {
        color: '#fff'
      }
    }
  },
  // Dialog
  dialogStyles: {
    closeBtn: {
      position: 'absolute',
      right: 0
    }
  },
  // Form
  formStyles: {
    form: {
      textAlign: 'center'
    },
    textField: {
      marginBottom: '1rem'
    },
    button: {
      marginBottom: '1rem'
    },
    icon: {
      marginBottom: '1rem'
    },
    pageTitle: {
      marginBottom: '1rem'
    },
    customError: {
      color: '#f44336',
      fontSize: '0.75rem',
      marginBottom: '1rem'
    }
  },
  // Profile
  profileStyles: {
    profile: {
      overflow: 'hidden'
    },
    profileImage: {
      position: 'relative',
      display: 'flex',
      width: '170px',
      height: '170px',
      margin: '1rem auto',
      '& img': {
        borderRadius: '50%',
        objectFit: 'cover'
      },
      '& button': {
        position: 'absolute',
        right: '-1rem',
        bottom: '-1rem'
      }
    },
    profileInformation: {
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      '& > p': {
        display: 'flex',
        alignItems: 'center',
        margin: '0.5rem 0 0 ',

        '& svg': {
          marginRight: '0.5rem'
        }
      }
    },
    profileActions: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 1rem 1rem'
    }
  },
  // Scream
  screamStyles: {
    card: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: 16
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 0 0'
    },
    content: {
      padding: '1.5rem 1.5rem 1rem'
    },
    actions: {
      display: 'flex',
      alignItems: 'center'
    }
  }
});
