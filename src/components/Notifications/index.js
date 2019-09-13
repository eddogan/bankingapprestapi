import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// Material-UI imports
import { Paper, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import Loading from "../Loading";

export default function Notifications() {
  const classes = useStyles();
  const [data, setData] = useState([{ message: "" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNotifications = () => {
    const api = `${process.env.REACT_APP_API_URL}/api/Notifications/${sessionStorage.AccountId}`;
    const axiosConfig = {
      method: "get",
      url: api,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.access_token}`
      }
    };
    axios(axiosConfig)
      .then(response => {
        if (response.status === 200) {
          setData(response.data);
          setLoading(false);
        } else {
          throw new Error(`Error Code ${response.status}`);
        }
      })
      .catch(error => {
        setError(true);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const notifications = data.map(data => (
    <div key={data.message}>
      <Typography variant="body1" component="p" align="center">
        {data.message}
      </Typography>
    </div>
  ));

  if (loading) {
    return <Loading isLoading={loading} error={error} />;
  } else {
    return (
      <Fragment>
        <Box mt={6}>
          <Paper square={true}>
            <Typography
              className="moduleTitle"
              variant="h6"
              component="h1"
              gutterBottom
            >
              <div className={classes.moduleTitle}>Notifications</div>
            </Typography>
            <div className="moduleContent">
              <Box pt={4} pb={4}>
                {notifications}
              </Box>
            </div>
          </Paper>
        </Box>
      </Fragment>
    );
  }
}

const useStyles = makeStyles(theme => ({
  moduleTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light
  }
}));
