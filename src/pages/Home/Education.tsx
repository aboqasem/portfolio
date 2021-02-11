import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { tDarkTheme } from '../../styles/themes';
import HomeSection from '../../components/HomeSection';

interface IEducation {
  dateFrom: string;
  dateTo: string;
  certificate: string;
  school: string;
  location: string;
}

const myEducation: IEducation[] = [
  {
    dateFrom: 'Early 2017',
    dateTo: 'November 2017',
    certificate: 'High School Diploma',
    school: 'Amjad Aloroba School',
    location: 'Istanbul, Turkey',
  },
  {
    dateFrom: 'April 2018',
    dateTo: 'March 2022',
    certificate: 'Bachelor of Computer Science (Software Engineering)',
    school: 'Multimedia University',
    location: 'Cyberjaya, Malaysia',
  },
];

const Education = (): JSX.Element => {
  return (
    <HomeSection theme={tDarkTheme} title={'Education'}>
      <List>
        {myEducation.reverse().map((value) => {
          return (
            <ListItem key={value.dateFrom + value.dateTo + value.certificate}>
              <ListItemText
                primary={
                  <>
                    <Typography component={'span'} variant={'subtitle2'}>
                      {value.dateFrom} - {value.dateTo}
                    </Typography>
                    <br />
                    {value.certificate}
                  </>
                }
                secondary={
                  <Typography variant={'subtitle2'} color={'textSecondary'}>
                    {value.school} - {value.location}
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

export default Education;
