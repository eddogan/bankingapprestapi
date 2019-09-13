import axios from "axios";
import qs from "qs";

export function logIn(response) {
  const {
    access_token,
    AccountId,
    expires,
    refresh_token,
    IsTempPassword
  } = response.data;

  if (access_token && AccountId && expires && refresh_token && IsTempPassword) {
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("refresh_token", refresh_token);
    sessionStorage.setItem("AccountId", AccountId);
    sessionStorage.setItem("expires", expires);
    sessionStorage.setItem("tempPass", IsTempPassword);
    window.location.assign("/overview");
  } else {
    throw new Error(`Error Code ${response.status}`);
  }
}

export function logOut() {
  sessionStorage.clear();
  window.location.assign("/");
}

export function userIsAuthenticated() {
  if (
    sessionStorage.getItem("access_token") &&
    sessionStorage.getItem("refresh_token") &&
    sessionStorage.getItem("AccountId") &&
    sessionStorage.getItem("expires")
  ) {
    startSessionTimer();
    return true;
  }
  return false;
}

export function passwordIsTemporary() {
  if (sessionStorage.getItem("tempPass") === "Y") {
    return true;
  }
  return false;
}

export function startSessionTimer() {
  // Start a timer
  let sessionTimer = window.setInterval(logOut, 5 * 60 * 1000);
  // Function used to refresh the timer
  const refreshSession = function() {
    clearInterval(sessionTimer);
    sessionTimer = window.setInterval(logOut, 5 * 60 * 1000);
  };
  // If user clicks something or presses a key reset the timer
  document.addEventListener("click", refreshSession);
  document.addEventListener("keydown", refreshSession);
  document.addEventListener("mousemove", refreshSession);
  document.addEventListener("scroll", refreshSession);
}

export function createResponseInterceptor() {
  const interceptor = axios.interceptors.response.use(
    // If the request succeeds, return the original response
    response => {
      return response;
    },
    // If there is an error, use the Interceptor to handle the error.
    error => {
      const status = error.response ? error.response.status : null;
      // Reject the Promise if the error is not a 401 error.
      if (status !== 401) {
        return Promise.reject(error);
        // When the response code is a 401, try to refresh the Bearer token.
      } else {
        // Eject the interceptor so it doesn't loop in case token refresh causes the 401 response
        axios.interceptors.response.eject(interceptor);
        // Post the refresh token to the API in order to receive a new Bearer token.
        const api = `${process.env.REACT_APP_API_URL}/token`;
        return axios({
          method: "POST",
          url: api,
          withCredentials: true,
          crossdomain: true,
          data: qs.stringify({
            grant_type: "refresh_token",
            refresh_token: sessionStorage.getItem("refresh_token"),
            client_id: process.env.REACT_APP_CLIENT_ID
          })
        })
          .then(response => {
            // Save the new tokens and resolve the original Promise as true
            const { access_token, expires, refresh_token } = response.data;
            sessionStorage.setItem("access_token", access_token);
            sessionStorage.setItem("refresh_token", refresh_token);
            sessionStorage.setItem("expires", expires);
            return Promise.resolve(true);
          })
          .catch(error => {
            return Promise.reject(error);
          });
      }
    }
  );
}
