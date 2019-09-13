import React, { Suspense, lazy } from "react";
// Material-UI imports
import { Grid } from "@material-ui/core";
// Custom imports
import Loading from "../../components/Loading";

const FaqAccordion = lazy(() => import("../../components/FaqAccordion"));

export default function Faq() {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={1} />
        <Grid item xs={12} lg={10}>
          <FaqAccordion />
        </Grid>
        <Grid item xs={12} lg={1} />
      </Grid>
    </Suspense>
  );
}
