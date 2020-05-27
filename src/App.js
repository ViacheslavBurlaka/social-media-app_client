import React, { useEffect } from 'react';
import './App.scss';
import AppRouter from './routers/AppRouter';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Themes
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './themes/MUItheme';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { getUserData, logoutUser } from './redux/actions/userActions';

const App = () => {
  const token = localStorage.FBIdToken;
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
      }
    }

    return function () {
      /**
       * Add cleanup code here
       */
    };
  }, [token]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
