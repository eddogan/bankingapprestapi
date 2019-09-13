import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
// Material-UI imports
import {
  Paper,
  Grid,
  Typography,
  Box,
  TextField,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import getApi from "../../helpers/GetApi";
import replaceNullsWithSpace from "../../helpers/ReplaceNullsWithSpace";
import formatPhoneNumbers from "../../helpers/FormatPhoneNumbers";
import { BrandingContext } from "../Branding";

export default function CustomerSupportForm(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    message: ""
  });

  const brand = useContext(BrandingContext);

  const fetchClient = async () => {
    const clientEndpoint = `${process.env.REACT_APP_API_URL}/api/clients/${sessionStorage.AccountId}`;
    const clientEndpointResponse = await axios(getApi(clientEndpoint));
    let personalData = await clientEndpointResponse.data;
    replaceNullsWithSpace(personalData);
    setValues(personalData);
  };

  useEffect(() => {
    fetchClient();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    // WRITE THE SUBMIT LOGIC
  };

  const handleInputChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const phoneNumber = formatPhoneNumbers(
    brand.phoneNumber.replace(/-/g, "").substring(1)
  );

  const link = `tel:+${brand.phoneNumber.replace(/-/g, "")}`;

  return (
    <Fragment>
      <Box my={6}>
        <Paper square={true}>
          <Typography
            className="moduleTitle"
            variant="h6"
            component="h1"
            gutterBottom
          >
            <div className={classes.moduleTitle}>Customer Support</div>
          </Typography>
          <div className="moduleContent">
            <form onSubmit={onSubmit}>
              <Grid
                container
                spacing={0}
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Box px={2}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      id="firstName"
                      name="firstName"
                      label="First name"
                      variant="outlined"
                      margin="normal"
                      value={values.firstName}
                      fullWidth={true}
                      disabled
                      className="ajaxLabel"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Box px={2}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      variant="outlined"
                      margin="normal"
                      value={values.lastName}
                      fullWidth={true}
                      disabled
                      className="ajaxLabel"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Box px={2}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      id="emailAddress"
                      name="emailAddress"
                      label="Email address"
                      variant="outlined"
                      margin="normal"
                      value={values.emailAddress}
                      fullWidth={true}
                      disabled
                      className="ajaxLabel"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box px={2}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      id="message"
                      name="message"
                      label="Message"
                      variant="outlined"
                      margin="normal"
                      multiline={true}
                      rows={3}
                      value={values.message}
                      fullWidth={true}
                      className="ajaxLabel"
                      onChange={handleInputChange("message")}
                      helperText="Message must contain at least 20 characters. Do not list your username, password, or Account ID."
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box m={2} className={classes.aligncenter}>
                    <Button variant="contained" color="primary" type="submit">
                      Send
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
            <Grid
              container
              spacing={0}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box m={2} className={classes.alignCenter}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.moduleSubTitle}
                  >
                    {brand.brandName}
                  </Typography>
                  <Typography component="p">
                    <a href={link} className={classes.link}>
                      {phoneNumber}
                    </a>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Box>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  moduleSubTitle: {
    borderTop: "1px dashed #eee",
    paddingTop: theme.spacing(2)
  },
  formControl: {
    "& label": {
      left: 8,
      top: "-8px",
      backgroundColor: "#fff",
      zIndex: 10,
      padding: "0 8px"
    }
  },
  moduleTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  },
  alignCenter: {
    textAlign: "center"
  }
}));
