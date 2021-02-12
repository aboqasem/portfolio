import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Code, Launch } from '@material-ui/icons';
import { tDarkTheme } from '../../styles/themes';
import { sListItemIconIconStyle } from '../../styles/styles';
import HomeSection from '../../components/HomeSection';

interface IProject {
  title: string;
  description: string;
  preview: string;
  url?: string;
  sourceCode?: string;
}

const ghUrl = 'https://github.com/aboqasem';
const previewUrlOf = (repo: string) => `${ghUrl}/${repo}/blob/main/docs/images/hero.gif?raw=true`;
const myProjects: IProject[] = [
  {
    title: 'AI Luminance',
    description: 'Simple color luminance detector using neural networks from brain.js.',
    preview: previewUrlOf('ai-luminance'),
    url: 'https://ai-luminance.aboqasem.dev/',
    sourceCode: `${ghUrl}/ai-luminance`,
  },
  {
    title: 'Time Progress',
    description: 'Various time progress bars.',
    preview: previewUrlOf('time_progress'),
    url: 'https://time-progress.aboqasem.dev/',
    sourceCode: `${ghUrl}/time_progress`,
  },
  {
    title: 'Ants and Bugs',
    description: 'Simple Java Swing simulation game applying design patterns.',
    preview: previewUrlOf('ants-and-bugs'),
    sourceCode: `${ghUrl}/ants-and-bugs`,
  },
];

const Projects = (): JSX.Element => {
  return (
    <HomeSection theme={tDarkTheme} title="Projects">
      <List>
        {myProjects.map((value) => {
          return (
            <ListItem key={value.url || value.sourceCode}>
              <Card variant="outlined" style={{ width: '100%', borderRadius: '10px' }}>
                <CardContent>
                  <Typography variant="body1">{value.title}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {value.description}
                  </Typography>
                </CardContent>

                {(value.preview ?? '') === '' ? null : (
                  <CardMedia
                    image={value.preview}
                    style={{
                      width: '90%',
                      height: 'clamp(20px, 20vw, 250px)',
                      marginLeft: '5%',
                      borderRadius: 'clamp(5px, 1.5vw, 25px)',
                    }}
                  />
                )}

                <CardActions>
                  <div style={{ marginLeft: 'auto' }}>
                    {(value.sourceCode?.trim() ?? '') === '' ? null : (
                      <Tooltip title="View source-code">
                        <Button
                          variant="outlined"
                          href={value.sourceCode || ''}
                          target="_blank"
                          style={{ margin: tDarkTheme.spacing(1) }}
                        >
                          <Code style={sListItemIconIconStyle.small} />
                        </Button>
                      </Tooltip>
                    )}

                    {(value.url?.trim() ?? '') === '' ? null : (
                      <Tooltip title="Launch">
                        <Button
                          variant="outlined"
                          href={value.url || ''}
                          target="_blank"
                          style={{ margin: tDarkTheme.spacing(1) }}
                        >
                          <Launch style={sListItemIconIconStyle.small} />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </CardActions>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </HomeSection>
  );
};

export default Projects;
