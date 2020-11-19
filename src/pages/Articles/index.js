import React from "react";
import {Typography} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {tLightTheme} from "../../styles/themes";
import MySection from "../../components/MySection";
import MyCenter from "../../components/MyCenter";

const MyArticles = () => {
  return (
      <ThemeProvider theme={tLightTheme}>
        <MySection minHeight={"100vh"}>
          <MyCenter>
            <Typography variant={"h1"}>🛠 Coming Soon! 🛠</Typography>
          </MyCenter>
        </MySection>
      </ThemeProvider>
  );
};

export default MyArticles;
