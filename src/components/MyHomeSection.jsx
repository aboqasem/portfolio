import React from "react";
import {Grid, ThemeProvider, Typography} from "@material-ui/core";
import MySection from "./MySection";
import MyCenter from "./MyCenter";
import MyMainColumn from "./MyMainColumn";

const MyHomeSection = (props) => {
  return (
      <ThemeProvider theme={props.theme}>
        {/* Responsive section */}
        <MySection minHeight={props.hero ? "100vh" : props.minHeight}>
          {/* Centering children  */}
          <MyCenter>
            {/* Responsive width container */}
            <MyMainColumn>

              {/* Heading */}
              <Typography variant={props.hero ? "h1" : "h2"}>
                {props.title}
              </Typography>

              {/* Body */}
              <Grid xs={12}>
                {props.children}
              </Grid>

            </MyMainColumn>
          </MyCenter>
        </MySection>
      </ThemeProvider>
  );
};

export default MyHomeSection;
