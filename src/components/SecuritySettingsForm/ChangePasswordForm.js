import React, { Fragment, useState } from "react";
// Material-UI imports
import { Typography, Box, TextField, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

export default function ChangePasswordForm() {
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
      <Box px={2} pb={2}>
        <Typography
          className={classes.moduleSubTitle}
          variant="h6"
          component="h1"
        >
          Change Password
        </Typography>
      </Box>
      <form onSubmit={onSubmit}>
        <Box px={2}>
          <TextField
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            variant="outlined"
            margin="normal"
            value=" "
            className="ajaxLabel"
            onChange={handleInputChange}
            fullWidth={true}
          />
        </Box>
        <Box px={2}>
          <TextField
            id="newPassword"
            name="newPassword"
            label="New password"
            variant="outlined"
            margin="normal"
            helperText="Your Password should include one uppercase letter, one special character, and should be at least 8 characters in length."
            value=" "
            className="ajaxLabel"
            onChange={handleInputChange}
            fullWidth={true}
          />
        </Box>
        <Box px={2}>
          <TextField
            id="verifyNewPassword"
            name="verifyNewPassword"
            label="Verify New Password"
            variant="outlined"
            margin="normal"
            value=" "
            className="ajaxLabel"
            onChange={handleInputChange}
            fullWidth={true}
          />
        </Box>
        <Box m={2} className={classes.aligncenter}>
          <Button variant="contained" color="primary" type="submit">
            Update password
          </Button>
        </Box>
      </form>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  moduleSubTitle: {
    borderBottom: "1px dashed #eee"
  }
}));
