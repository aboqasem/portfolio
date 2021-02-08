/**
 * A component for horizontal and vertical responsive centering.
 */
import React from "react";
import { Grid } from "@material-ui/core";

const Center = (props) => {
  return (
    <Grid
      container
      direction={"column"}
      style={{
        justify: "center",
        alignItems: "center",
        margin: "auto",
        marginTop: "min(20vw, 100px)",
        marginBottom: "min(20vw, 100px)",
      }}
    >
      {props.children}
    </Grid>
  );
};

export default Center;
