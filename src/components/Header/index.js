import React, { lazy, memo, useContext } from "react";
// Material-UI imports
import {
  AppBar,
  Paper,
  Toolbar,
  Button,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Material-UI icon imports
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
// Custom imports
import { logOut } from "../../services/Authentication";
import { BrandingContext } from "../Branding";

const Welcome = lazy(() => import("../Welcome"));

function Header(props) {
  const classes = useStyles();

  const [anchorElement, setAnchorElement] = React.useState(null);

  const brand = useContext(BrandingContext);

  function handleClick(event) {
    setAnchorElement(event.currentTarget);
  }

  function handleClose() {
    setAnchorElement(null);
  }

  return (
    <AppBar position="static" color="default">
      <Paper elevation={2} className="zIndex100">
        <Toolbar>
          <a className={classes.homeLink} href="/overview">
            <img
              className={classes.logo}
              src={brand.logoFilePath}
              alt={brand.brandName}
            />
          </a>
          <Button
            aria-controls="user-menu"
            aria-haspopup="true"
            className={classes.menuButton}
            color="primary"
            onClick={handleClick}
          >
            <Welcome />
            <KeyboardArrowDownOutlinedIcon />
          </Button>
          <Menu
            id="user-menu"
            elevation={1}
            anchorEl={anchorElement}
            keepMounted
            open={Boolean(anchorElement)}
            onClose={handleClose}
          >
            <MenuItem disabled={props.disabled}>
              <a className={classes.menuLink} href="/account-settings">
                Account Settings
              </a>
            </MenuItem>
            <MenuItem disabled={props.disabled}>
              <a className={classes.menuLink} href="/faq">
                FAQ
              </a>
            </MenuItem>
            <MenuItem disabled={props.disabled}>
              <a className={classes.menuLink} href="/customer-support">
                Customer Support
              </a>
            </MenuItem>
            <MenuItem>
              <Button color="primary" onClick={logOut}>
                Logout
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Paper>
    </AppBar>
  );
}

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  homeLink: {
    flexGrow: 1
  },
  menuLink: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    display: "block",
    width: "100%"
  },
  logo: {
    maxWidth: 160
  }
}));

export const MemoizedHeader = memo(Header);
