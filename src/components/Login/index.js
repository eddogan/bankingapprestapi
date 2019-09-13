import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import qs from "qs";
import clsx from "clsx";
// Material-UI imports
import { Grid, Typography, TextField, Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import { logIn, userIsAuthenticated } from "../../services/Authentication";
import { ForgotUsernameModal, TroubleLoggingInModal } from "../Modals";
import { CreateUserModal } from "../CreateUserModal";
import { ForgotPasswordModal } from "../ForgotPasswordModal";
import { BrandingContext } from "../Branding";

export default function Login() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasErrors, setHasErrors] = useState(false);
  const [loginNotice, setLoginNotice] = useState(true);

  const brand = useContext(BrandingContext);

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const closeNotice = event => {
    setLoginNotice(false);
  };

  const onSubmit = event => {
    event.preventDefault();
    const api = `${process.env.REACT_APP_API_URL}/token`;
    const axiosConfig = {
      method: "post",
      url: api,
      withCredentials: true,
      crossdomain: true,
      data: qs.stringify({
        grant_type: "password",
        username: username,
        password: password,
        client_id: process.env.REACT_APP_CLIENT_ID
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache"
      }
    };
    axios(axiosConfig)
      .then(response => {
        if (response.status === 200) {
          logIn(response);
        } else {
          throw new Error(`Error Code ${response.status}`);
        }
      })
      .catch(error => {
        setHasErrors(true);
        console.log(error);
      });
  };

  useEffect(() => {
    if (userIsAuthenticated()) {
      window.location.assign("/overview");
    }
  }, []);

  return (
    <Grid
      container
      spacing={0}
      justify="center"
      alignItems="center"
      className={classes.fullHeight}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        className={classes.loginContainer}
      >
        <Box>
          <a href="/">
            <img
              className={classes.logo}
              src={brand.logoFilePath}
              alt={brand.brandName}
            />
          </a>
          <Typography variant="h6" component="h1" align="center" gutterBottom>
            Log in to your accounts
          </Typography>
          <Paper
            className={clsx(classes.show, {
              [classes.hide]: !loginNotice
            })}
          >
            <div className={classes.infoIcon}>i</div>
            <Typography variant="body" component="p" gutterBottom>
              Welcome to our new website! If this is your first time logging in
              since January 9, please create a new username. Once you have
              created a new username, you will be required to Sign In.
            </Typography>
            <div className={classes.closeIcon} onClick={closeNotice}>
              &times;
            </div>
          </Paper>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box pr={2} className={classes.loginForm}>
              <form id="login" onSubmit={onSubmit} autoComplete="off">
                <TextField
                  id="username"
                  name="username"
                  label="Username (required)"
                  value={username}
                  onChange={handleUsernameChange}
                  margin="dense"
                  variant="outlined"
                  error={hasErrors}
                  fullWidth
                  autoFocus
                  required
                />
                <TextField
                  type="password"
                  id="password"
                  name="password"
                  label="Password (required)"
                  value={password}
                  onChange={handlePasswordChange}
                  margin="dense"
                  variant="outlined"
                  error={hasErrors}
                  fullWidth
                  required
                />
                {hasErrors ? (
                  <div>
                    <small className="error">
                      The user name or password is incorrect.
                    </small>
                  </div>
                ) : (
                  <div />
                )}

                <Box mt={2}>
                  <input
                    className="fullWidth MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
                    type="submit"
                    value="Sign In"
                  />
                </Box>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box pl={2}>
              <Typography variant="body1" className={classes.actionsTitle}>
                May I help you?
              </Typography>
              <CreateUserModal />
              <ForgotUsernameModal />
              <ForgotPasswordModal />
              <TroubleLoggingInModal />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  logo: {
    display: "block",
    width: "100%",
    maxWidth: 373,
    padding: theme.spacing(0, 0, 4),
    margin: "0 auto"
  },
  title: {
    padding: "20px 0",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  loginForm: {
    "@media (min-width: 840px)": {
      padding: theme.spacing(0, 3, 0, 1),
      borderRight: `1px solid ${theme.palette.secondary.main}`,
      height: "100%" // This may not work in all browsers if I remember it correctly.
    }
  },
  actionsTitle: {
    margin: theme.spacing(0, 0, 1, 1)
  },
  fullHeight: {
    height: "100vh"
  },
  loginContainer: {
    maxWidth: "560px"
  },
  show: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: theme.spacing(3, 5, 3, 2),
    margin: theme.spacing(0, 1, 3),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    height: "auto",
    maxHeight: 999,
    transition: "all .3s ease-in-out"
  },
  hide: {
    maxHeight: 0,
    padding: 0,
    opacity: 0,
    transition: "all .3s ease-in-out"
  },
  infoIcon: {
    border: "2px solid #fff",
    borderRadius: "50%",
    fontWeight: 700,
    width: 24,
    height: 24,
    flex: "0 0 24px",
    marginRight: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  closeIcon: {
    borderRadius: "50%",
    fontWeight: 700,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    "&:hover": {
      color: theme.palette.secondary.contrastText
    }
  }
}));
