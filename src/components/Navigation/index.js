import React, { memo } from "react";
// Material-UI imports
import { Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Material-UI icon imports
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";

function Navigation(props) {
  const classes = useStyles();

  if (props.disabled) {
    return (
      <Paper className={classes.mainNav} elevation={0} square={true}>
        <Box mb={2}>
          <HomeOutlinedIcon className={classes.icon} />
          <Typography
            className={classes.iconTitle}
            variant="caption"
            component="small"
            align="center"
            gutterBottom
          >
            Overview
          </Typography>
        </Box>
        <Box mb={2}>
          <CalendarTodayOutlinedIcon className={classes.icon} />
          <Typography
            className={classes.iconTitle}
            variant="caption"
            component="small"
            align="center"
            gutterBottom
          >
            Scheduled Future Transactions
          </Typography>
        </Box>
        <Box mb={2}>
          <NoteOutlinedIcon className={classes.icon} />
          <Typography
            className={classes.iconTitle}
            variant="caption"
            component="small"
            align="center"
            gutterBottom
          >
            Completed Transactions
          </Typography>
        </Box>
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.mainNav} elevation={0} square={true}>
        <Box mb={2}>
          <a href="/overview" className={classes.menuLink}>
            <HomeOutlinedIcon className={classes.icon} />
            <Typography
              className={classes.iconTitle}
              variant="caption"
              component="small"
              align="center"
              gutterBottom
            >
              Overview
            </Typography>
          </a>
        </Box>
        <Box mb={2}>
          <a href="/scheduled-future-transactions" className={classes.menuLink}>
            <CalendarTodayOutlinedIcon className={classes.icon} />
            <Typography
              className={classes.iconTitle}
              variant="caption"
              component="small"
              align="center"
              gutterBottom
            >
              Scheduled Future Transactions
            </Typography>
          </a>
        </Box>
        <Box mb={2}>
          <a href="/completed-transactions" className={classes.menuLink}>
            <NoteOutlinedIcon className={classes.icon} />
            <Typography
              className={classes.iconTitle}
              variant="caption"
              component="small"
              align="center"
              gutterBottom
            >
              Completed Transactions
            </Typography>
          </a>
        </Box>
      </Paper>
    );
  }
}

const useStyles = makeStyles(theme => ({
  mainNav: {
    padding: "40px 0"
  },
  menuLink: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  },
  icon: {
    display: "block !important",
    margin: "0 auto",
    width: "1.5em !important",
    height: "1.5em !important"
  },
  iconTitle: {
    display: "block !important",
    margin: "0 auto",
    // @todo: convert the following value to a variable on the theme.palette object
    color: "#525672"
  }
}));

export const MemoizedNavigation = memo(Navigation);
