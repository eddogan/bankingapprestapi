import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// Material-UI imports
import { Grid, Paper, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import Loading from "../Loading";
import {
  getToday,
  getNextWeeksDate,
  getLastWeeksDate
} from "../../helpers/FormatDates";
import { checkforEmptyObject } from "../../helpers/CheckForEmptyObject";

export default function TransactionSummary() {
  const classes = useStyles();

  const [completedTransactions, setCompletedTransactions] = useState([{}]);
  const [scheduledTransactions, setScheduledTransactions] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTransactions = (type, startDate, endDate) => {
    const api = `${process.env.REACT_APP_API_URL}/api/clients/${sessionStorage.AccountId}/ClientTransactions?SearchType=${type}&startDate=${startDate}&endDate=${endDate}`;
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
          setCompletedTransactions(response.data);
          setScheduledTransactions(response.data);
          setLoading(false);
        } else {
          throw new Error(`Error Code ${response.status}`);
        }
      })
      .catch(error => {
        setError(true);
      });
  };

  const calculateScheduledTransactions = typeId => {
    function filterByType(item) {
      if (item.type === typeId) {
        return true;
      }
      return false;
    }
    if (checkforEmptyObject(scheduledTransactions[0])) {
      return 0;
    } else {
      let filteredArray = scheduledTransactions.filter(filterByType);
      return filteredArray.length;
    }
  };

  const calculateCompletedTransactions = () => {
    if (checkforEmptyObject(completedTransactions[0])) {
      return 0;
    } else {
      return completedTransactions.length;
    }
  };

  useEffect(() => {
    fetchTransactions("Completed", getLastWeeksDate(), getToday());
    fetchTransactions("Scheduled", getToday(), getNextWeeksDate());
  }, []);

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
              <div className={classes.moduleTitle}>Transaction Summary</div>
            </Typography>
            <div className="moduleContent">
              <Grid container spacing={1}>
                <Grid item xs={12} lg={4} className={classes.borderRight}>
                  <Typography
                    align="center"
                    variant="h5"
                    component="h2"
                    gutterBottom
                  >
                    {calculateScheduledTransactions(80)}
                    <br />
                    Upcoming Payments
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4} className={classes.borderRight}>
                  <Typography
                    align="center"
                    variant="h5"
                    component="h2"
                    gutterBottom
                  >
                    {calculateScheduledTransactions(68)}
                    <br />
                    Upcoming Deposits
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography
                    align="center"
                    variant="h5"
                    component="h2"
                    gutterBottom
                  >
                    {calculateCompletedTransactions()}
                    <br />
                    Recently Completed Transactions
                  </Typography>
                </Grid>
              </Grid>
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
  },
  borderRight: {
    // @todo: convert the following value to a variable on the theme.palette object
    borderRight: "1px solid #f2f3f8"
  }
}));
