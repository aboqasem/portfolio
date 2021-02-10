import { createMuiTheme } from '@material-ui/core';
import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';

const defaultDarkTheme = createMuiTheme({ palette: { type: 'dark' } });
const defaultLightTheme = createMuiTheme({ palette: { type: 'light' } });

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
function generateHeadingStyle(
  theme: string,
  fontWeight:
    | number
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'bold'
    | 'normal'
    | 'bolder'
    | 'lighter'
    | undefined,
): TypographyStyleOptions {
  return {
    fontSize: 'clamp(1.32rem, 5vw, 3rem)',
    fontWeight,
    display: 'inline-block',
    lineHeight: '2em',
    background:
      theme === 'dark'
        ? '-webkit-linear-gradient(0deg, #2c7744 0%, #5a3f37 75%)'
        : '-webkit-linear-gradient(0deg, #5a3f37 0%, #2c7744 75%)',
    backgroundClip: 'text',
    '-webkit-background-clip': 'text',
    color: 'transparent',
  };
}
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
const tDarkTheme = createMuiTheme({
  props: {
    MuiListItemIcon: {
      style: {
        color: defaultDarkTheme.palette.text.primary,
      },
    },
    MuiListItemText: {
      primaryTypographyProps: {
        style: {
          fontSize: 'clamp(0.75rem, 2.8vw, 1.75rem)',
        },
      },
    },
  },
  palette: {
    type: 'dark',
    background: {
      default: '#000',
      paper: '#000',
    },
    text: {
      primary: '#fff',
    },
    primary: {
      main: '#5a3f37',
    },
  },
  typography: {
    h1: {
      ...generateHeadingStyle('dark', 'bold'),
    },
    h2: {
      ...generateHeadingStyle('dark', 'normal'),
    },
    body1: {
      fontSize: 'clamp(0.875rem, 3vw, 1.875rem)',
    },
    subtitle2: {
      fontSize: 'clamp(0.7rem, 2.5vw, 1.25rem)',
    },
  },
});
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
const tLightTheme = createMuiTheme({
  props: {
    MuiListItemIcon: {
      style: {
        color: defaultLightTheme.palette.text.primary,
      },
    },
    MuiListItemText: {
      primaryTypographyProps: {
        style: {
          fontSize: 'clamp(0.75rem, 2.8vw, 1.75rem)',
        },
      },
    },
  },
  palette: {
    type: 'light',
    background: {
      default: '#fafafa',
      paper: '#fafafa',
    },
    text: {
      primary: '#000',
    },
    primary: {
      main: '#2c7744',
    },
  },
  typography: {
    h1: {
      ...generateHeadingStyle('light', 'bold'),
    },
    h2: {
      ...generateHeadingStyle('light', 'normal'),
    },
    body1: {
      fontSize: 'clamp(0.875rem, 3vw, 1.875rem)',
    },
    subtitle2: {
      fontSize: 'clamp(0.7rem, 2.5vw, 1.25rem)',
    },
  },
});
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

export { tDarkTheme, tLightTheme };
