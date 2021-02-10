import React from 'react';
import { Grid, ThemeProvider, Typography } from '@material-ui/core';
import Section from './Section';
import Center from './Center';
import MainColumn from './MainColumn';

const HomeSection = (props: any) => {
  return (
    <ThemeProvider theme={props.theme}>
      {/* Responsive section */}
      <Section minHeight={props.hero ? '100vh' : props.minHeight}>
        {/* Centering children  */}
        <Center>
          {/* Responsive width container */}
          <MainColumn>
            {/* Heading */}
            <Typography variant={props.hero ? 'h1' : 'h2'}>{props.title}</Typography>

            {/* Body */}
            <Grid item xs={12}>
              {props.children}
            </Grid>
          </MainColumn>
        </Center>
      </Section>
    </ThemeProvider>
  );
};

export default HomeSection;
