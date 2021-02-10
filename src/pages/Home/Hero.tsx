import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { tDarkTheme } from '../../styles/themes';
import HomeSection from '../../components/HomeSection';

const Hero = () => {
  return (
    <HomeSection hero theme={tDarkTheme} title={"Hey, I'm Mohammad Al Zouabi."}>
      <Typography variant={'body1'}>
        Enthusiastic software developer who stands for quality, consistency, and attention to details.
      </Typography>

      {/* Responsive sized box */}
      <Grid item xs={12}>
        <Box height={'min(4vw, 35px)'} />
      </Grid>
    </HomeSection>
  );
};

export default Hero;
