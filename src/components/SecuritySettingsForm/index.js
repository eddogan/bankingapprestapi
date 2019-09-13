import React, { Fragment } from "react";
// Material-UI imports
import { Grid, Box } from "@material-ui/core";
// Custom imports
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeSecurityQuestionsForm from "./ChangeSecurityQuestionsForm";

export default function SecuritySettingsForm() {
  return (
    <Fragment>
      <Box my={2}>
        <div className="moduleContent">
          <Grid
            container
            spacing={0}
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <ChangePasswordForm />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <ChangeSecurityQuestionsForm />
            </Grid>
          </Grid>
        </div>
      </Box>
    </Fragment>
  );
}
