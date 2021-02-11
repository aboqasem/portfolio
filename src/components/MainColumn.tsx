/**
 * A component for responsive width.
 */
import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';

interface Props {
  children: ReactNode;
}

const MainColumn = (props: Props): JSX.Element => {
  return (
    <Grid
      container
      style={{
        width: '80vw',
        maxWidth: '700px',
        alignItems: 'baseline',
      }}
    >
      {props.children}
    </Grid>
  );
};

export default MainColumn;
