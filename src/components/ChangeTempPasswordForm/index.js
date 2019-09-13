import React, { Fragment } from "react";
// Material-UI imports
import { Grid, Typography, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import ChangePasswordForm from "../../components/SecuritySettingsForm/ChangePasswordForm";

export default function SecurityQuestions(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} lg={8}>
          <Box mt={6}>
            <Paper square={true}>
              <Typography
                className="moduleTitle"
                variant="h6"
                component="h1"
                gutterBottom
              >
                <div className={classes.moduleTitle}>
                  Change your temporary password
                </div>
              </Typography>
              <ChangePasswordForm />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  moduleTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light
  }
}));
