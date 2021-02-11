import React, { ReactNode } from 'react';
import { Grid, ThemeProvider, Typography } from '@material-ui/core';
import { DefaultTheme } from '@material-ui/styles';
import Section from './Section';
import Center from './Center';
import MainColumn from './MainColumn';

interface Props {
  children: ReactNode;
  theme: Partial<DefaultTheme> | ((outerTheme: DefaultTheme) => DefaultTheme);
  hero?: boolean;
  minHeight?: string | undefined;
  title: string;
}

const HomeSection = (props: Props): JSX.Element => {
  return (
    <ThemeProvider theme={props.theme}>
      {/* Responsive section */}
      <Section minHeight={props.hero ? '100vh' : props.minHeight}>
        {/* Centering children  */}
        <Center>
          {/* Responsive width container */}
          <MainColumn>
            {/* Heading */}
            <Typography
              variant={props.hero ? 'h1' : 'h2'}
              style={props.hero ? { position: 'relative', zIndex: 1 } : {}}
            >
              {props.title}
            </Typography>

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
