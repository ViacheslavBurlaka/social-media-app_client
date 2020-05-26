import React from 'react';
import './App.scss';
import AppRouter from './routers/AppRouter';

// Themes
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './themes/MUItheme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
