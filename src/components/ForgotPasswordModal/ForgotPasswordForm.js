import React, { Fragment, useState } from "react";
import axios from "axios";
import qs from "qs";
// Material-UI imports
import { Box, TextField, Button } from "@material-ui/core/";

export default function SetUserPassForm() {
  const [username, setUsername] = useState("");
  const [confirmation, setConfirmation] = useState({
    text: "",
    classname: ""
  });

  const onSubmit = event => {
    event.preventDefault();
    const api = `${process.env.REACT_APP_API_URL}/useraccess/lostpassword`;
    const axiosConfig = {
      method: "post",
      url: api,
      withCredentials: true,
      crossdomain: true,
      data: qs.stringify({
        username: username,
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
          if (response.data.hasErrors === true) {
            setConfirmation({
              text: `${response.data.errors[0].message}.`,
              classname: "error"
            });
          }
          if (response.data.hasWarnings === true) {
            setConfirmation({
              text: `${response.data.errors[0].message}. Please contact us at `,
              classname: "error"
            });
          } else {
            setConfirmation({
              text: "An email has been sent containing the temporary password.",
              classname: "success"
            });
          }
        } else {
          throw new Error(`Error Code ${response.status}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <Box px={2}>
          <TextField
            id="username"
            name="username"
            label="Username"
            placeholder="Enter your username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={handleUsernameChange}
            fullWidth={true}
            InputProps={{ inputProps: { autoComplete: "off", maxLength: 20 } }}
          />
        </Box>
        <Box m={2}>
          <Button variant="contained" color="primary" type="submit">
            Send me reset instructions
          </Button>
        </Box>
      </form>
      <Box px={2}>
        <p className={confirmation.classname}>{confirmation.text}</p>
      </Box>
    </Fragment>
  );
}
