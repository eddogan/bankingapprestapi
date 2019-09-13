import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
// Material-UI imports
import {
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import getApi from "../../helpers/GetApi";
import replaceNullsWithSpace from "../../helpers/ReplaceNullsWithSpace";
import formatPhoneNumbers from "../../helpers/FormatPhoneNumbers";
import states from "../../helpers/StateSelectOptions/index.json";

export default function PersonalInfoForm(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    middleInitial: "",
    phoneNumber: "",
    emailAddress: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
    contactFirst: "",
    contactMiddle: "",
    contactLast: ""
  });

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const fetchAddress = async () => {
    const clientAddressesEndpoint = `${process.env.REACT_APP_API_URL}/api/clients/${sessionStorage.AccountId}/addresses`;
    const clientAddressResponse = await axios(getApi(clientAddressesEndpoint));
    const addressdata = await clientAddressResponse.data[0];

    const clientEndpoint = `${process.env.REACT_APP_API_URL}/api/clients/${sessionStorage.AccountId}`;
    const clientEndpointResponse = await axios(getApi(clientEndpoint));
    let personalData = await clientEndpointResponse.data;
    personalData.phoneNumber = formatPhoneNumbers(personalData.phoneNumber);

    const clientContactsEndpoint = `${process.env.REACT_APP_API_URL}/api/clients/${sessionStorage.AccountId}/contacts`;
    const clientContactsResponse = await axios(getApi(clientContactsEndpoint));
    // Have to do it this way, because properties are the same with addressdata.
    const contactFirst = await clientContactsResponse.data[0].firstName;
    const contactMiddle = await clientContactsResponse.data[0].middleInitial;
    const contactLast = await clientContactsResponse.data[0].lastName;
    const contactData = {
      contactFirst: contactFirst,
      contactMiddle: contactMiddle,
      contactLast: contactLast
    };

    // Combine objects
    const data = { ...addressdata, ...personalData, ...contactData };
    replaceNullsWithSpace(data);
    setValues(data);
  };

  const stateSelector = Object.entries(states).map(function(state, index) {
    return (
      <option key={index} value={state[0]}>
        {state[1]}
      </option>
    );
  });

  useEffect(() => {
    fetchAddress(props.account);
  }, [props.account]);

  const onSubmit = event => {
    event.preventDefault();
    // WRITE THE SUBMIT LOGIC
  };

  const handleInputChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handlePhoneChange = prop => event => {
    var x = event.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    event.target.value = !x[2]
      ? x[1]
      : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    setValues({
      ...values,
      [prop]: event.target.value
    });
  };

  return (
    <Fragment>
      <Box mb={2}>
        <div className="moduleContent">
          <form onSubmit={onSubmit}>
            <Grid
              container
              spacing={0}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box px={2} pb={2}>
                  <Typography
                    className={classes.moduleSubTitle}
                    variant="h6"
                    component="h1"
                  >
                    Personal Information
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
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
              <Grid item xs={12} sm={12} md={5} lg={2}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="middleName"
                    name="middleName"
                    label="Middle name"
                    variant="outlined"
                    margin="normal"
                    value={values.middleInitial}
                    fullWidth={true}
                    disabled
                    className="ajaxLabel"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
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
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone"
                    variant="outlined"
                    margin="normal"
                    value={values.phoneNumber}
                    onChange={handlePhoneChange("phoneNumber")}
                    fullWidth={true}
                    className="ajaxLabel"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
                    className="ajaxLabel"
                    onChange={handleInputChange("emailAddress")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="line1"
                    name="line1"
                    label="Address"
                    variant="outlined"
                    margin="normal"
                    value={values.line1}
                    fullWidth={true}
                    className="ajaxLabel"
                    onChange={handleInputChange("line1")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="line2"
                    name="line2"
                    label="Address (continued)"
                    variant="outlined"
                    margin="normal"
                    value={values.line2}
                    fullWidth={true}
                    className="ajaxLabel"
                    onChange={handleInputChange("line2")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={5}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="city"
                    name="city"
                    label="City"
                    variant="outlined"
                    margin="normal"
                    value={values.city}
                    fullWidth={true}
                    className="ajaxLabel"
                    onChange={handleInputChange("city")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={5}>
                <Box px={2}>
                  <FormControl
                    className={classes.formControl}
                    margin="normal"
                    fullWidth={true}
                  >
                    <InputLabel
                      ref={inputLabel}
                      htmlFor="state"
                      shrink={true}
                      className="ajaxLabel"
                    >
                      State
                    </InputLabel>
                    <Select
                      native
                      value={values.state}
                      onChange={handleInputChange("state")}
                      input={
                        <OutlinedInput
                          name="state"
                          labelWidth={labelWidth}
                          id="state"
                        />
                      }
                    >
                      {stateSelector}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={2}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="zipcode"
                    name="zipcode"
                    label="Zip"
                    variant="outlined"
                    margin="normal"
                    value={values.zipcode}
                    fullWidth={true}
                    className="ajaxLabel"
                    onChange={handleInputChange("zipcode")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box m={2} className={classes.aligncenter}>
                  <Button variant="contained" color="primary" type="submit">
                    Request Update
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
              <Box px={2} pb={2} pt={6}>
                <Typography
                  className={classes.moduleSubTitle}
                  variant="h6"
                  component="h1"
                >
                  Authorized Contact Information
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Box px={2}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="contactFirstName"
                  name="contactFirstName"
                  label="First name"
                  variant="outlined"
                  margin="normal"
                  value={values.contactFirst}
                  fullWidth={true}
                  disabled
                  className="ajaxLabel"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={2}>
              <Box px={2}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="contactMiddleName"
                  name="contactMiddleName"
                  label="Middle name"
                  variant="outlined"
                  margin="normal"
                  value={values.contactMiddle}
                  fullWidth={true}
                  disabled
                  className="ajaxLabel"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Box px={2}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="contactLastName"
                  name="contactLastName"
                  label="Last name"
                  variant="outlined"
                  margin="normal"
                  value={values.contactLast}
                  fullWidth={true}
                  disabled
                  className="ajaxLabel"
                />{" "}
              </Box>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  moduleSubTitle: {
    borderBottom: "1px dashed #eee"
  },
  formControl: {
    "& label": {
      left: 8,
      top: "-8px",
      backgroundColor: "#fff",
      zIndex: 10,
      padding: "0 8px"
    }
  }
}));
