import React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, SvgIconTypeMap, Typography } from '@material-ui/core';
import { Home, Language, LocalLibrary, PersonPin } from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { tLightTheme } from '../../styles/themes';
import { sListItemIconIconStyle } from '../../styles/styles';
import HomeSection from '../../components/HomeSection';

interface IInformation {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  text: string;
}

const myInformation: IInformation[] = [
  {
    icon: Home,
    text: 'From Daraa, Syria',
  },
  {
    icon: PersonPin,
    text: 'In Cyberjaya, Malaysia',
  },
  {
    icon: LocalLibrary,
    text: "Pursuing Bachelor's at Multimedia University",
  },
  {
    icon: Language,
    text: 'Arabic, English, and basics of Turkish',
  },
];

const About = (): JSX.Element => {
  return (
    <HomeSection theme={tLightTheme} title="Quick Brief">
      <Typography variant="body1">
        Software engineering student who is eager to learn. Here is some information about me:
        <br />
      </Typography>

      <List>
        {myInformation.map((value) => {
          return (
            <ListItem key={value.icon.toString() + value.text}>
              <ListItemIcon>
                <value.icon style={sListItemIconIconStyle.large} />
                {/* Responsive sized box */}
                <Box width="min(4vw, 35px)" />
              </ListItemIcon>
              <ListItemText primary={value.text} />
            </ListItem>
          );
        })}
      </List>

      <div style={{ textAlign: 'center' }}>
        {/* Responsive sized box */}
        <Box height="min(4vw, 35px)" />
        <Button
          variant="contained"
          color="primary"
          href="https://drive.google.com/file/d/1BC5VROktcMhvsBnkWtApbYVd7gO882o_/view?usp=sharing"
          target="_blank"
        >
          <Typography variant="body1">View Resume</Typography>
        </Button>
      </div>
    </HomeSection>
  );
};

export default About;
