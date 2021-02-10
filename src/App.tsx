import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { tDarkTheme } from './styles/themes';
import Home from './pages/Home';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={tDarkTheme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
};

export default App;
