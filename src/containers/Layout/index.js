import React, { Fragment } from "react";
// Material-UI imports
import { Grid, Paper } from "@material-ui/core";
// Custom imports
import { MemoizedHeader as Header } from "../../components/Header";
import { MemoizedFooter as Footer } from "../../components/Footer";
import { MemoizedNavigation as Navigation } from "../../components/Navigation";

export default function Layout(props) {
  if (window.location.pathname === "/") {
    return (
      <Fragment>
        <Paper elevation={0}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              {props.children}
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Header disabled={false} />
        <Paper elevation={0}>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={2} xl={1} className="MuiPaper-root">
              <Navigation disabled={false} />
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              lg={10}
              xl={11}
              className="greyBackground"
            >
              {props.children}
            </Grid>
            <Grid container spacing={0} component="footer">
              <Grid item xs={12} lg={2} xl={1} />
              <Grid item xs={12} md={10} lg={10}>
                <Footer />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    );
  }
}
