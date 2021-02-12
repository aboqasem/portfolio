import React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { tLightTheme } from '../../styles/themes';
import { sListItemIconImgStyle } from '../../styles/styles';
import HomeSection from '../../components/HomeSection';

interface IAchievement {
  from: string;
  logoUrl: string;
  achievement: string;
  url: string;
}

const myAchievements: IAchievement[] = [
  {
    from: 'Multimedia University',
    logoUrl: 'https://www.mmu.edu.my/wp-content/themes/mmu2018/assets/images/cropped-mmulogo-only-192x192.png',
    achievement: "Dean's List Trimester 2, 2019/2020",
    url: 'https://www.mmu.edu.my/cyberjaya/undergraduate/information-technology/bachelor-of-computer-science-hons/',
  },
  {
    from: 'Udemy',
    logoUrl: 'https://www.udemy.com/staticx/udemy/images/v6/favicon-196x196.png',
    achievement: 'The Complete 2020 Web Development Bootcamp',
    url: 'https://www.udemy.com/certificate/UC-df9853fa-31a9-4d62-bbfe-d0d9269f4d6a/',
  },
  {
    from: 'Udemy',
    logoUrl: 'https://www.udemy.com/staticx/udemy/images/v6/favicon-196x196.png',
    achievement: 'The Complete 2020 Flutter Development Bootcamp with Dart',
    url: 'https://www.udemy.com/certificate/UC-268bcbe8-7826-4c72-8b2b-c42ad3391789/',
  },
  {
    from: 'Coursera',
    logoUrl: 'https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/icon-blue-96x96.png',
    achievement: 'Information Systems Auditing, Controls and Assurance',
    url: 'https://coursera.org/share/7c98c3912365fbff6985da0aeac98ddf',
  },
];

const Achievements = (): JSX.Element => {
  return (
    <HomeSection theme={tLightTheme} title="Achievements">
      <List>
        {myAchievements.map((value) => {
          return (
            <ListItem key={value.url} alignItems="flex-start">
              <ListItemIcon>
                <Button
                  variant="outlined"
                  href={value.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ height: '100%', width: '100%' }}
                >
                  <img src={value.logoUrl} alt={''} style={sListItemIconImgStyle} />
                </Button>
                {/* Responsive sized box */}
                <Box width="min(4vw, 35px)" />
              </ListItemIcon>
              <ListItemText
                primary={value.achievement}
                secondary={
                  <Typography variant="subtitle2" color="textSecondary">
                    {value.from}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </HomeSection>
  );
};

export default Achievements;
