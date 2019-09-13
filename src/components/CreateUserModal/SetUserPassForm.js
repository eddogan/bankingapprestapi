import React, { Fragment, useState } from "react";
// Material-UI imports
import { Grid, Box, TextField, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

export default function SetUserPassForm() {
  const classes = useStyles();
  const [values, setValues] = useState("");

  const onSubmit = event => {
    event.preventDefault();
  };

  const handleInputChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box px={2}>
              <TextField
                id="setUsername"
                name="setUsername"
                label="Set Username"
                variant="outlined"
                margin="normal"
                helperText="Create a username that is easy to remember and under 20 characters. You may not use your Client ID."
                value=""
                onChange={handleInputChange}
                fullWidth={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box px={2}>
              <TextField
                id="verifyUsername"
                name="verifyUsername"
                label="Verify username"
                variant="outlined"
                margin="normal"
                value=""
                onChange={handleInputChange}
                fullWidth={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box px={2}>
              <TextField
                id="setPassword"
                name="setPassword"
                label="Set Password"
                variant="outlined"
                margin="normal"
                helperText="Your Password should include one uppercase letter, one special character, and should be at least 8 characters in length."
                value=""
                onChange={handleInputChange}
                fullWidth={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box px={2}>
              <TextField
                id="verifyPassword"
                name="verifyPassword"
                label="Verify password"
                variant="outlined"
                margin="normal"
                value=""
                onChange={handleInputChange}
                fullWidth={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box px={2}>
              <TextField
                id="accountNumber"
                name="accountNumber"
                label="Account number"
                variant="outlined"
                margin="normal"
                helperText="This is the 16-digit number found in the Welcome Letter you received from us."
                value=""
                onChange={handleInputChange}
                fullWidth={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Box px={2}>
              <TextField
                id="zipCode"
                name="zipCode"
                label="Zip code"
                variant="outlined"
                margin="normal"
                value=""
                onChange={handleInputChange}
                fullWidth={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Box px={2}>
              <TextField
                id="lastFourSsn"
                name="lastFourSsn"
                label="Last 4 digits of your SSN"
                variant="outlined"
                margin="normal"
                value=""
                onChange={handleInputChange}
                fullWidth={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box m={2} className={classes.aligncenter}>
              <Button variant="contained" color="primary" type="submit">
                Create User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  moduleSubTitle: {
    borderBottom: "1px dashed #eee"
  }
}));
