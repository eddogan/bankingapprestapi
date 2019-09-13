import React, { Fragment, useState, useEffect, useCallback } from "react";
import axios from "axios";
// Material-UI imports
import { Grid, Typography, Box, TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import getApi from "../../helpers/GetApi";

export default function ExternalBankInfoForm() {
  const classes = useStyles();
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    accountType: ""
  });

  const fetchBank = useCallback(async () => {
    const clientBankAccountEndpoint = `${process.env.REACT_APP_API_URL}/api/clients/${sessionStorage.AccountId}/bankaccounts`;
    const clientBankAccountResponse = await axios(
      getApi(clientBankAccountEndpoint)
    );
    // Mask account number
    let accountNumber = clientBankAccountResponse.data[0].accountNumber;
    accountNumber = `************${accountNumber.substring(
      accountNumber.length - 4
    )}`;
    clientBankAccountResponse.data[0].accountNumber = accountNumber;

    setBankInfo(clientBankAccountResponse.data[0]);
  }, []);

  useEffect(() => {
    fetchBank();
  }, [fetchBank]);

  return (
    <Fragment>
      <Box mb={2}>
        <div className="moduleContent">
          <form>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box px={2}>
                  <Typography
                    className={classes.moduleSubTitle}
                    variant="h6"
                    component="h1"
                  >
                    External Bank Information
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box p={2}>
                  <Typography variant="body2">
                    Changes to External Bank Information may be made by calling
                    Customer Care at
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="bankName"
                    name="bankName"
                    label="Bank name"
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    value={bankInfo.bankName}
                    disabled
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="bankRoutingNumber"
                    name="bankRoutingNumber"
                    label="Bank routing number"
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    value={bankInfo.routingNumber}
                    disabled
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="bankAccountNumber"
                    name="bankAccountNumber"
                    label="Bank account number"
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    value={bankInfo.accountNumber}
                    disabled
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box px={2}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="bankAccountType"
                    name="bankAccountType"
                    label="Bank account type"
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    value={bankInfo.accountType}
                    disabled
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  moduleSubTitle: {
    borderBottom: "1px dashed #eee"
  }
}));
