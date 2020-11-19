import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {tDarkTheme} from "../../styles/themes";
import HeroImage from "../../assets/hero-image.jpeg";
import {heroImageStyle} from "../../styles/styles";
import MyHomeSection from "../../components/MyHomeSection";

const MyHero = () => {
  return (
      <MyHomeSection hero theme={tDarkTheme} title={"Hey, I'm Mohammad Al Zouabi."}>

        <Typography variant={"body1"}>
          Enthusiastic software developer who stands for quality, consistency, and attention to details.
        </Typography>

        {/* Responsive sized box */}
        <Grid item xs={12}><Box height={"min(4vw, 35px)"}/></Grid>

        {/* Hero image */}
        <img style={heroImageStyle} alt={"Mohammad Al Zouabi"} src={HeroImage}/>


      </MyHomeSection>
  );
};

export default MyHero;
