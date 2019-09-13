import React from "react";
// Material-UI imports
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Loading({ isLoading = true, error = false }) {
  const classes = useStyles();
  if (isLoading && !error) {
    return (
      <div className={classes.loading}>
        <Box component="div" visibility="hidden">
          Loading...
        </Box>
      </div>
    );
  } else if (isLoading && error) {
    return (
      <div className={classes.loading}>
        <Box component="div" className={classes.copy}>
          <small>There was an issue loading this information.</small>
        </Box>
      </div>
    );
  }
  return null;
}

const useStyles = makeStyles(theme => ({
  "@keyframes loading": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" }
  },
  loading: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    height: "100%",
    "&::after": {
      content: "''",
      position: "absolute",
      left: "48%",
      top: "48%",
      display: "block",
      width: 20,
      height: 20,
      margin: 1,
      borderRadius: "50%",
      border: "2px solid #333",
      borderColor: `${theme.palette.primary.main} transparent ${theme.palette.primary.main}`,
      animation: "loading 1.2s linear infinite",
      animationName: "$loading"
    }
  },
  copy: {
    position: "absolute",
    top: "65%",
    textAlign: "center",
    width: "100%"
  }
}));
