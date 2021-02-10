import React from 'react';
import { AppBar, Slide, Toolbar, Typography, useScrollTrigger } from '@material-ui/core';

const Navbar = (): JSX.Element => {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <AppBar component="nav" position="fixed" color="transparent" elevation={0}>
        <Toolbar>
          <Typography>aboqasem</Typography>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
