import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { tDarkTheme } from "./styles/themes";
import MyHome from "./pages/Home";

const App = () => {
  return (
    <ThemeProvider theme={tDarkTheme}>
      <CssBaseline />
      <MyHome />
    </ThemeProvider>
  );
};

export default App;
