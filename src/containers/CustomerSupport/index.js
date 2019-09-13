import React, { Suspense, lazy } from "react";
// Material-UI imports
import { Grid } from "@material-ui/core";
// Custom imports
import Loading from "../../components/Loading";

const CustomerSupportForm = lazy(() =>
  import("../../components/CustomerSupportForm")
);

export default function CustomerSupport() {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} lg={10}>
          <CustomerSupportForm />
        </Grid>
      </Grid>
    </Suspense>
  );
}
