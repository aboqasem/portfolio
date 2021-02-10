/**
 * A component for a responsive section.
 */
import React from 'react';
import { Paper } from '@material-ui/core';

const Section = (props: any): JSX.Element => {
  return (
    <Paper
      square
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: props.minHeight,
      }}
    >
      {props.children}
    </Paper>
  );
};

export default Section;
