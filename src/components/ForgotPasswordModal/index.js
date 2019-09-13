import React, { useState, Fragment } from "react";
// Material-UI imports
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import ForgotPasswordForm from "./ForgotPasswordForm";

export function ForgotPasswordModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <Button
        variant="text"
        color="primary"
        onClick={handleClickOpen}
        className={classes.alignEnd}
      >
        Forgot password?
        <span className={classes.buttonSpan}>Reset password</span>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Forgot password?</DialogTitle>
        <DialogContent>
          <ForgotPasswordForm />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  buttonSpan: {
    color: "#6c757d",
    fontSize: "80%",
    marginLeft: ".5em"
  },
  alignEnd: {
    alignItems: "flex-end"
  }
}));
