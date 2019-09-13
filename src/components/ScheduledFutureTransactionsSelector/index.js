import React, { useState, useEffect, Fragment } from "react";
// Material-UI imports
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
// Custom imports
import Loading from "../Loading";
import fetchTransactions from "../../services/FetchTransactions";
import { filterTransactionTypes } from "../../helpers/FilterTransactionTypes";
import { getToday } from "../../helpers/FormatDates";

const ScheduledFutureTransactionsTable = React.lazy(() =>
  import("../ScheduledFutureTransactionsTable")
);

export default function ScheduledFutureTransactionsSelector() {
  const classes = useStyles();
  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [transactionsTypeFilter, setTransactionTypeFilter] = useState(
    "All Transaction Types"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const useMountEffect = func => useEffect(func, []);

  const onChange = event => {
    setTransactionTypeFilter(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    filterTransactionTypes(
      initialData,
      setFilteredData,
      transactionsTypeFilter
    );
  };

  useMountEffect(() => {
    fetchTransactions(
      "Scheduled",
      "ascending",
      getToday(),
      null,
      () => {
        setError(true);
      },
      data => {
        filterTransactionTypes(data, setFilteredData, transactionsTypeFilter);
        setInitialData(data);
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
              <div className={classes.moduleTitle}>
                Scheduled Future Transactions
              </div>
            </Typography>
            <div className="moduleContent">
              <p>Displaying scheduled transactions for the account</p>
              <strong>{sessionStorage.AccountId}</strong>
              <br />
              <form onSubmit={onSubmit} onChange={onChange}>
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
                  />
                  <FormControlLabel
                    value="Deposit"
                    control={<Radio color="primary" />}
                    label="Deposits"
                  />
                  <FormControlLabel
                    value="Fee"
                    control={<Radio color="primary" />}
                    label="Fees"
                  />
                  <FormControlLabel
                    value="Payment"
                    control={<Radio color="primary" />}
                    label="Payments"
                  />
                </RadioGroup>
                <Box mt={2}>
                  <input
                    type="submit"
                    value="Submit"
                    className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
                  />
                </Box>
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
            <ScheduledFutureTransactionsTable data={filteredData} />
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
