import {createMuiTheme} from "@material-ui/core";

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
const defaultDarkTheme = createMuiTheme({palette: {type: "dark"}});

const defaultLightTheme = createMuiTheme({palette: {type: "light"}});

const generateHeadingStyle = (theme, fontWeight) => {
  return {
    fontSize: "clamp(1.32rem, 5vw, 3rem)",
    fontWeight: fontWeight,
    display: "inline-block",
    lineHeight: "2em",
    background: theme === "dark" ?
        "-webkit-linear-gradient(0deg, #2c7744 0%, #5a3f37 75%)" :
        "-webkit-linear-gradient(0deg, #5a3f37 0%, #2c7744 75%)",
    backgroundClip: "text",
    "-webkit-background-clip": "text",
    color: "transparent",
  };
};
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
const tDarkTheme = createMuiTheme({
  props: {
    MuiListItemIcon: {
      style: {
        color: defaultDarkTheme.palette.text.primary,
      }
    },
  },
  palette: {
    type: "dark",
    background: {
      default: "#121212",
      paper: "#121212",
    },
    text: {
      primary: "#fff",
    },
    primary: {
      main: "#5a3f37",
    },
  },
  typography: {
    h1: {
      ...generateHeadingStyle("dark", "bold"),
    },
    h2: {
      ...generateHeadingStyle("dark", "normal"),
    },
    body1: {
      fontSize: "clamp(0.875rem, 3vw, 1.875rem)",
    },
    subtitle2: {
      fontSize: "clamp(0.7rem, 2.5vw, 1.25rem)",
    },
  },
});
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */
const tLightTheme = createMuiTheme({
  props: {
    MuiListItemIcon: {
      style: {
        color: defaultLightTheme.palette.text.primary,
      }
    },
  },
  palette: {
    type: "light",
    background: {
      default: "#fafafa",
      paper: "#fafafa",
    },
    text: {
      primary: "#000",
    },
    primary: {
      main: "#2c7744",
    },
  },
  typography: {
    h1: {
      ...generateHeadingStyle("light", "bold"),
    },
    h2: {
      ...generateHeadingStyle("light", "normal"),
    },
    body1: {
      fontSize: "clamp(0.875rem, 3vw, 1.875rem)",
    },
    subtitle2: {
      fontSize: "clamp(0.7rem, 2.5vw, 1.25rem)",
    },
  },
});
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

export {tDarkTheme, tLightTheme}
