/**
 * A component for a responsive section.
 */
import React, { ReactNode } from 'react';
import { Paper } from '@material-ui/core';

interface Props {
  children: ReactNode;
  minHeight?: string | undefined;
}

const Section = (props: Props): JSX.Element => {
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
