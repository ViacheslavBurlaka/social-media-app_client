import React, { useEffect, useState } from 'react';
import './App.scss';
import AppRouter from './routers/AppRouter';
import jwtDecode from 'jwt-decode';
// Themes
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './themes/MUItheme';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  // TODO: temp solution, will fixed later
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      // your token will be expired when token date < now date
      setAuthenticated(decodedToken.exp * 1000 > Date.now());
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter authenticated={authenticated} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
