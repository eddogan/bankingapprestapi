import React, { useState, useEffect, Fragment, lazy } from "react";
import MomentUtils from "@date-io/moment";
// Material-UI imports
import {
  Paper,
  Box,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import Loading from "../Loading";
import fetchTransactions from "../../services/FetchTransactions";
import { filterTransactionTypes } from "../../helpers/FilterTransactionTypes";
import {
  formatDate,
  getToday,
  getFirstDayOfLastMonth,
  getFirstOfTheMonth,
  getFirstDayOfLastThreeMonths,
  getLastDayOfLastMonth
} from "../../helpers/FormatDates";

const CompletedTransactionsTable = lazy(() =>
  import("../CompletedTransactionsTable")
);

export default function CompletetedTransactionsSelector() {
  const classes = useStyles();
  const [filteredData, setFilteredData] = useState([]);
  const [transactionsTypeFilter, setTransactionTypeFilter] = useState(
    "All Transaction Types"
  );
  const [dateRange, setDateRange] = useState("Current Month");
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [customEndDate, setCustomEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const useMountEffect = func => useEffect(func, []);

  const handleTransactionTypeChange = event => {
    setTransactionTypeFilter(event.target.value);
  };

  const handleDateRangeChange = event => {
    const value = event.target.value;
    if (value === "Last Month") {
      setDateRange("Last Month");
    } else if (value === "Last Three Months") {
      setDateRange("Last Three Months");
    } else if (value === "Custom Date Range") {
      setDateRange("Custom Date Range");
    } else {
      setDateRange("Current Month");
    }
  };

  const handleCustomStartDate = event => {
    let date = event.toDate();
    date = formatDate(date);
    setCustomStartDate(date);
  };

  const handleCustomEndDate = event => {
    let date = event.toDate();
    date = formatDate(date);
    setCustomEndDate(date);
  };

  const onSubmit = event => {
    event.preventDefault();
    setLoading(true);
    if (dateRange === "Last Month") {
      fetchTransactions(
        "Completed",
        "descending",
        getFirstDayOfLastMonth(),
        getLastDayOfLastMonth(),
        () => {
          setError(true);
        },
        data => {
          filterTransactionTypes(data, setFilteredData, transactionsTypeFilter);
          setLoading(false);
        }
      );
    } else if (dateRange === "Last Three Months") {
      fetchTransactions(
        "Completed",
        "descending",
        getFirstDayOfLastThreeMonths(),
        getToday(),
        () => {
          setError(true);
        },
        data => {
          filterTransactionTypes(data, setFilteredData, transactionsTypeFilter);
          setLoading(false);
        }
      );
    } else if (dateRange === "Custom Date Range") {
      fetchTransactions(
        "Completed",
        "descending",
        customStartDate,
        customEndDate,
        () => {
          setError(true);
        },
        data => {
          filterTransactionTypes(data, setFilteredData, transactionsTypeFilter);
          setLoading(false);
        }
      );
    } else {
      fetchTransactions(
        "Completed",
        "descending",
        getFirstOfTheMonth(),
        getToday(),
        () => {
          setError(true);
        },
        data => {
          filterTransactionTypes(data, setFilteredData, transactionsTypeFilter);
          setLoading(false);
        }
      );
    }
  };

  useMountEffect(() => {
    fetchTransactions(
      "Completed",
      "descending",
      getToday(),
      null,
      () => {
        setError(true);
      },
      data => {
        filterTransactionTypes(data, setFilteredData, transactionsTypeFilter);
        setLoading(false);
      }
    );
  });

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
              <div className={classes.moduleTitle}>Completed Transactions</div>
            </Typography>
            <div className="moduleContent">
              <form onSubmit={onSubmit}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <p>Displaying completed transactions for the account</p>
                    <strong>{sessionStorage.AccountId}</strong>
                    <br />
                    <p>Displaying transactions of:</p>
                    <RadioGroup
                      aria-label="Transaction Types"
                      name="transactionTypes"
                      className="inlineLabels"
                      value={transactionsTypeFilter}
                    >
                      <FormControlLabel
                        value="All Transaction Types"
                        control={<Radio color="primary" />}
                        label="All Transaction Types"
                        onChange={handleTransactionTypeChange}
                      />
                      <FormControlLabel
                        value="Deposit"
                        control={<Radio color="primary" />}
                        label="Deposits"
                        onChange={handleTransactionTypeChange}
                      />
                      <FormControlLabel
                        value="Fee"
                        control={<Radio color="primary" />}
                        label="Fees"
                        onChange={handleTransactionTypeChange}
                      />
                      <FormControlLabel
                        value="Payment"
                        control={<Radio color="primary" />}
                        label="Payments"
                        onChange={handleTransactionTypeChange}
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <p>Transaction Period</p>
                    <RadioGroup
                      aria-label="Transaction Period"
                      name="transactionPeriod"
                      className="inlineLabels"
                      value={dateRange}
                    >
                      <FormControlLabel
                        value="Current Month"
                        control={<Radio color="primary" />}
                        label="Current Month"
                        onChange={handleDateRangeChange}
                      />
                      <FormControlLabel
                        value="Last Month"
                        control={<Radio color="primary" />}
                        label="Last Month"
                        onChange={handleDateRangeChange}
                      />
                      <FormControlLabel
                        value="Last Three Months"
                        control={<Radio color="primary" />}
                        label="Last Three Months"
                        onChange={handleDateRangeChange}
                      />
                      <FormControlLabel
                        value="Custom Date Range"
                        control={<Radio color="primary" />}
                        label="Custom Date Range"
                        onChange={handleDateRangeChange}
                      />
                    </RadioGroup>
                    {dateRange === "Custom Date Range" ? (
                      <Fragment>
                        <Box m={2} className={classes.calendarBox}>
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                              value={customStartDate}
                              onChange={handleCustomStartDate}
                            />
                          </MuiPickersUtilsProvider>
                        </Box>
                        <Box m={2} className={classes.calendarBox}>
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                              value={customEndDate}
                              onChange={handleCustomEndDate}
                            />
                          </MuiPickersUtilsProvider>
                        </Box>
                      </Fragment>
                    ) : (
                      <div />
                    )}
                  </Grid>
                  <Box mt={2}>
                    <input
                      type="submit"
                      value="Submit"
                      className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
                    />
                  </Box>
                </Grid>
              </form>
            </div>
          </Paper>
        </Box>
        <Box mt={6}>
          <Paper square={true}>
            <Typography
              className="moduleTitle"
              variant="h6"
              component="h1"
              gutterBottom
            >
              <div className={classes.moduleTitle}>Transactions</div>
            </Typography>
            <CompletedTransactionsTable data={filteredData || []} />
          </Paper>
        </Box>
      </Fragment>
    );
  }
}

const useStyles = makeStyles(theme => ({
  calendarBox: {
    display: "inline-block"
  },
  moduleTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light
  }
}));
