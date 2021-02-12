/**
 * A component for horizontal and vertical responsive centering.
 */
import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';

interface Props {
  children: ReactNode;
}

const Center = (props: Props): JSX.Element => {
  return (
    <Grid
      container
      direction="column"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        marginTop: 'min(20vw, 100px)',
        marginBottom: 'min(20vw, 100px)',
      }}
    >
      {props.children}
    </Grid>
  );
};

export default Center;
