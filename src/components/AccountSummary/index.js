import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// Material-UI imports
import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import Loading from "../Loading";
import { formatStatusCode } from "../../helpers/FormatStatusCode";

export default function AccountSummary() {
  const classes = useStyles();

  const [data, setData] = useState({
    balance: "",
    active: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStatus = () => {
    const api = `${process.env.REACT_APP_API_URL}/api/Clients/${sessionStorage.AccountId}`;
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
    fetchStatus();
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
              <div className={classes.moduleTitle}>Account Summary</div>
            </Typography>
            <div className="moduleContent">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Account Number</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Balance</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{sessionStorage.AccountId}</TableCell>
                    <TableCell>${data.balance}</TableCell>
                    <TableCell>
                      <Chip
                        label={formatStatusCode(data.active)}
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
