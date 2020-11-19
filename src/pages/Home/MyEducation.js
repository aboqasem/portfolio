import React from "react";
import {List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {tDarkTheme} from "../../styles/themes";
import MyHomeSection from "../../components/MyHomeSection";

const myEducation = [
  {
    dateFrom: "Early 2017",
    dateTo: "November 2017",
    certificate: "High School Diploma",
    school: "Amjad Aloroba School",
    location: "Istanbul, Turkey",
  },
  {
    dateFrom: "April 2018",
    dateTo: "March 2022",
    certificate: "Bachelor of Computer Science (Software Engineering)",
    school: "Multimedia University",
    location: "Cyberjaya, Malaysia",
  },
];

const MyEducation = () => {
  return (
      <MyHomeSection theme={tDarkTheme} title={"Education"}>

        <List>
          {myEducation.reverse().map(value => {
            return (
                <>
                  <ListItem>
                    <ListItemText
                        primary={
                          <>
                            <Typography component={"span"} variant={"subtitle2"}>
                              {value.dateFrom} - {value.dateTo}
                            </Typography><br/>
                            {value.certificate}
                          </>
                        }
                        secondary={
                          <Typography variant={"subtitle2"} color={"textSecondary"}>
                            {value.school} - {value.location}
                          </Typography>
                        }/>
                  </ListItem>
                </>
            );
          })}
        </List>

      </MyHomeSection>
  );
};

export default MyEducation;
