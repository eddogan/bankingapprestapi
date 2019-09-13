import React, { useState, Fragment } from "react";
// Material-UI imports
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import SetUserPassForm from "./SetUserPassForm";

export function CreateUserModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
        New user?{" "}
        <span className={classes.buttonSpan}>
          Click here to create username
        </span>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Create your username & password
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <SetUserPassForm />
          </DialogContentText>
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
