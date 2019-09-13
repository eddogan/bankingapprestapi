import React, { Suspense, lazy } from "react";
// Material-UI imports
import { Grid } from "@material-ui/core";
// Custom imports
import Loading from "../../components/Loading";

const AccountSummary = lazy(() => import("../../components/AccountSummary"));
const Notifications = lazy(() => import("../../components/Notifications"));
const TransactionSummary = lazy(() =>
  import("../../components/TransactionSummary")
);

export default function Overview() {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={1} />
        <Grid item xs={12} lg={5}>
          <AccountSummary />
        </Grid>
        <Grid item xs={12} lg={5}>
          <Notifications />
        </Grid>
        <Grid item xs={12} lg={1} />
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={1} />
        <Grid item xs={12} lg={10}>
          <TransactionSummary />
        </Grid>
        <Grid item xs={12} lg={1} />
      </Grid>
      <Grid item xs={12} lg={1} />
    </Suspense>
  );
}
