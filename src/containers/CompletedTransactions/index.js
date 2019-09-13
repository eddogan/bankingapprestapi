import React, { Suspense, lazy } from "react";
// Material-UI imports
import { Grid } from "@material-ui/core";
// Custom imports
import Loading from "../../components/Loading";

const CompletedTransactionsSelector = lazy(() =>
  import("../../components/CompletedTransactionsSelector")
);

export default function CompletedTransactions() {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={1} />
        <Grid item xs={12} lg={10}>
          <CompletedTransactionsSelector />
        </Grid>
        <Grid item xs={12} lg={1} />
      </Grid>
    </Suspense>
  );
}
