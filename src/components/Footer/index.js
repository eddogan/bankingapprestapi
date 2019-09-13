import React, { memo, useContext } from "react";
// Material-UI imports
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import { getYear } from "../../helpers/FormatDates";
import { BrandingContext } from "../Branding";

function Footer() {
  const classes = useStyles();
  const brand = useContext(BrandingContext);
  return (
    <Paper elevation={0} className={classes.footer}>
      <p>
        {getYear()} © {brand.brandName}
      </p>
    </Paper>
  );
}

const useStyles = makeStyles(() => ({
  footer: {
    display: "flex",
    flexDirection: "column"
  }
}));

export const MemoizedFooter = memo(Footer);
