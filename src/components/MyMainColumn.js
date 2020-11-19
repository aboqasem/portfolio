/**
 * A component for responsive width.
 */
import React from "react";
import {Grid} from "@material-ui/core";

const MyMainColumn = (props) => {
  return (
      <Grid container
            style={{
              width: "80vw",
              maxWidth: "700px",
              alignItems: "baseline",
            }}>
        {props.children}
      </Grid>
  );
};

export default MyMainColumn;
