import React, { Suspense, lazy, useState } from "react";
// Material-UI imports
import { Grid, Paper, Tab, Tabs, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import Loading from "../../components/Loading";
const PersonalInformationForm = lazy(() =>
  import("../../components/PersonalInfoForm")
);
const ExternalBankInfoForm = lazy(() =>
  import("../../components/ExternalBankInfoForm")
);
const SecuritySettingsForm = lazy(() =>
  import("../../components/SecuritySettingsForm")
);

function SettingsTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    "aria-controls": `settings-tabpanel-${index}`
  };
}

export default function AccountSettings() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <Box my={6} className={classes.moduleFullWidth}>
        <Paper>
          <Grid container className={classes.moduleTitle} alignItems="center">
            <Grid item xs={12} lg={3}>
              <Box pl={3} py={2}>
                <Typography variant="h6" component="h1">
                  Account Settings
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={9} className={classes.justifiedRight}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Account settings tabs"
              >
                <Tab
                  label="Personal Information"
                  aria-label="Personal Information"
                  {...a11yProps(0)}
                  className={classes.tabs}
                />
                <Tab
                  label="External Bank Information"
                  aria-label="External Bank Information"
                  {...a11yProps(1)}
                  className={classes.tabs}
                />
                <Tab
                  label="Security Settings"
                  aria-label="Security Settings"
                  {...a11yProps(2)}
                  className={classes.tabs}
                />
              </Tabs>
            </Grid>
          </Grid>
          {value === 0 && (
            <SettingsTabPanel value={value} index={0}>
              <PersonalInformationForm />
            </SettingsTabPanel>
          )}
          {value === 1 && (
            <SettingsTabPanel value={value} index={1}>
              <ExternalBankInfoForm />
            </SettingsTabPanel>
          )}
          {value === 2 && (
            <SettingsTabPanel value={value} index={2}>
              <SecuritySettingsForm />
            </SettingsTabPanel>
          )}

          <Grid item xs={12} lg={1} />
        </Paper>
      </Box>
    </Suspense>
  );
}

const useStyles = makeStyles(theme => ({
  moduleTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light
  },
  moduleFullWidth: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  tabs: {
    padding: theme.spacing(3),
    "&.Mui-selected": {
      background: theme.palette.secondary.main
    }
  },
  justifiedRight: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));
