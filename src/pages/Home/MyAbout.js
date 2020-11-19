import React from "react";
import {Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {Home, Language, LocalLibrary, PersonPin} from "@material-ui/icons";
import {tLightTheme} from "../../styles/themes";
import {listItemIconIconStyle} from "../../styles/styles";
import MyHomeSection from "../../components/MyHomeSection";

const myInformation = [
  {
    icon: Home,
    text: "From Daraa, Syria",
  },
  {
    icon: PersonPin,
    text: "In Cyberjaya, Malaysia",
  },
  {
    icon: LocalLibrary,
    text: "Pursuing Bachelor's at Multimedia University",
  },
  {
    icon: Language,
    text: "Arabic, English, and basics of Turkish",
  },
];

const MyAbout = () => {
  return (
      <MyHomeSection theme={tLightTheme} title={"Quick Brief"}>

        <Typography variant={"body1"}>
          Software engineering student who is eager to learn. Here is some information about me:<br/>
        </Typography>

        <List>
          {myInformation.map(value => {
            return (
                <ListItem>
                  <ListItemIcon>
                    <value.icon style={listItemIconIconStyle.large}/>
                    {/* Responsive sized box */}
                    <Box width={"min(4vw, 35px)"}/>
                  </ListItemIcon>
                  <ListItemText primary={value.text}/>
                </ListItem>
            );
          })}
        </List>

        <div align={"center"}>
          {/* Responsive sized box */}
          <Box height={"min(4vw, 35px)"}/>
          <Button variant={"contained"} color={"primary"}
                  href={"https://drive.google.com/file/d/17so8IyeydhpoN2DKBFnblggmBBNeVATC/view?usp=sharing"}
                  target={"_blank"}>
            <Typography variant={"body1"}>View Resume</Typography>
          </Button>
        </div>

      </MyHomeSection>
  );
};

export default MyAbout;
