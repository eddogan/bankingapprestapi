import React from "react";
import { Route } from "react-router-dom";
// Custom imports
import {
  userIsAuthenticated,
  logOut,
  passwordIsTemporary
} from "../../services/Authentication";

export default function PrivateRoute(props) {
  const { component: Component, temporary: Temporary, ...rest } = props;

  if (passwordIsTemporary()) {
    return (
      <Route
        {...rest}
        render={() =>
          userIsAuthenticated() === true ? <Temporary /> : logOut()
        }
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          userIsAuthenticated() === true ? <Component {...props} /> : logOut()
        }
      />
    );
  }
}
