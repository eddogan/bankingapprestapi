import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import getBrandingConfig from "./helpers/GetBrandingConfig";

import App from "./containers/App";
import "./styles.css";
import { BrandingContext } from "./components/Branding";

const axiosConfig = {
  method: "get",
  url: `${process.env.REACT_APP_API_URL}/api/branding/${getBrandingConfig()}/`
};
axios(axiosConfig)
  .then(response => {
    if (response.status === 200) {
      const theme = createMuiTheme({
        palette: {
          primary: {
            main: `#${response.data.color1}`,
            light: "#fff"
          },
          secondary: {
            main: `#${response.data.color2}`,
            light: "#0066ff",
            contrastText: "#ffcc00"
          }
        },
        typography: {
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
          ].join(",")
        },
        props: {
          MuiButtonBase: {
            disableRipple: true
          }
        },
        overrides: {
          MuiButton: {
            root: {
              textTransform: "none"
            },
            text: {
              textTransform: "none"
            }
          },
          MuiAppBar: {
            colorDefault: {
              backgroundColor: "#ffffff"
            }
          },
          MuiDialogTitle: {
            root: {
              padding: "16px 40px",
              borderBottom: "1px solid #eee"
            }
          }
        }
      });
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          <BrandingContext.Provider value={response.data}>
            <App />
          </BrandingContext.Provider>
        </ThemeProvider>,
        document.getElementById("root")
      );
    } else {
      throw new Error(`Error Code ${response.status}`);
    }
  })
  .catch(error => {
    console.log(error);
  });
