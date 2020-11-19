import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Tooltip,
  Typography
} from "@material-ui/core";
import {Code, Launch} from "@material-ui/icons";
import {tDarkTheme} from "../../styles/themes";
import {listItemIconIconStyle} from "../../styles/styles";
import MyHomeSection from "../../components/MyHomeSection";
import AntsAndBugsPrev from "../../assets/ants-and-bugs.gif";
import AiLuminancePrev from "../../assets/ai-luminance.gif";

const myProjects = [
  {
    title: "AI Luminance",
    description: "Simple color luminance detector using neural networks from brain.js.",
    preview: AiLuminancePrev,
    url: "https://ai-luminance.herokuapp.com/",
    sourceCode: "https://github.com/aboqasem/ai-luminance",
  },
  {
    title: "Ants and Bugs",
    description: "Simple Java Swing simulation game applying design patterns.",
    preview: AntsAndBugsPrev,
    sourceCode: "https://github.com/aboqasem/ants-and-bugs",
  },
];

const MyProjects = () => {
  return (
      <MyHomeSection theme={tDarkTheme} title={"Projects"}>

        <List>
          {myProjects.map(value => {
            return (
                <ListItem>
                  <Card variant="outlined" style={{width: "100%", borderRadius: "10px"}}>

                    <CardContent>
                      <Typography variant={"body1"}>
                        {value.title}
                      </Typography>
                      <Typography variant={"subtitle2"} color={"textSecondary"}>
                        {value.description}
                      </Typography>
                    </CardContent>

                    {(value.preview ?? "") === "" ? null :
                        <CardMedia image={value.preview} style={{
                          width: "90%",
                          height: "clamp(20px, 20vw, 250px)",
                          marginLeft: "5%",
                          borderRadius: "10px",
                        }}/>}

                    <CardActions>
                      <div style={{marginLeft: "auto"}}>
                        {(value.sourceCode?.trim() ?? "") === "" ? null :
                            <Tooltip title="View source-code">
                              <Button variant={"outlined"} href={value.sourceCode} target={"_blank"}
                                      style={{margin: tDarkTheme.spacing(1),}}>
                                <Code style={listItemIconIconStyle.small}/>
                              </Button>
                            </Tooltip>}

                        {(value.url?.trim() ?? "") === "" ? null :
                            <Tooltip title="Launch">
                              <Button variant={"outlined"} href={value.url} target={"_blank"}
                                      style={{margin: tDarkTheme.spacing(1),}}>
                                <Launch style={listItemIconIconStyle.small}/>
                              </Button>
                            </Tooltip>}
                      </div>
                    </CardActions>

                  </Card>
                </ListItem>
            );
          })}
        </List>

      </MyHomeSection>
  );
};

export default MyProjects;
