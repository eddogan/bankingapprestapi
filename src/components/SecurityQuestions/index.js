import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
// Material-UI imports
import { Grid, Typography, Paper, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import Loading from "../Loading";

export default function SecurityQuestions(props) {
  const classes = useStyles();
  const [randomQuestion, setRandomQuestion] = useState({
    copy: "",
    id: 0
  });
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [securityQuestionAnswered, setSecurityQuestionAnswered] = useState(
    sessionStorage.securityQuestionAnswered
  );
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const useMountEffect = func => useEffect(func, []);

  const fetchSecurityQuestionsLibrary = () => {
    const api = `${process.env.REACT_APP_API_URL}/useraccess/securityquestions`;
    const axiosConfig = {
      method: "get",
      url: api,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.access_token}`
      }
    };
    axios(axiosConfig)
      .then(response => {
        if (response.status === 200) {
          fetchChosenSecurityQuestions(response.data);
        } else {
          throw new Error(`Error Code ${response.status}`);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const fetchChosenSecurityQuestions = securityQuestionsLibrary => {
    const api = `${process.env.REACT_APP_API_URL}/useraccess/securityquestions_answers?accountId=${sessionStorage.AccountId}`;
    const axiosConfig = {
      method: "get",
      url: api,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.access_token}`
      }
    };
    axios(axiosConfig)
      .then(response => {
        if (response.status === 200) {
          displayOneRandomChosenQuestion(
            response.data,
            securityQuestionsLibrary
          );
        } else {
          throw new Error(`Error Code ${response.status}`);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const displayOneRandomChosenQuestion = (
    chosenQuestions,
    securityQuestionsLibrary
  ) => {
    const chosenQuestionsKeys = Object.keys(chosenQuestions);

    const question1 = {
      id: [chosenQuestionsKeys[0]],
      copy: securityQuestionsLibrary[chosenQuestionsKeys[0]]
    };

    const question2 = {
      id: [chosenQuestionsKeys[1]],
      copy: securityQuestionsLibrary[chosenQuestionsKeys[1]]
    };

    const question3 = {
      id: [chosenQuestionsKeys[2]],
      copy: securityQuestionsLibrary[chosenQuestionsKeys[2]]
    };

    let chosenQuestionsArray = [];
    chosenQuestionsArray.push(question1, question2, question3);

    let randomQuestion =
      chosenQuestionsArray[
        Math.floor(Math.random() * chosenQuestionsArray.length)
      ];
    setRandomQuestion(randomQuestion);
    setLoading(false);
  };

  const checkSecurityQuestionAnswer = () => {
    const api = `${process.env.REACT_APP_API_URL}/useraccess/securityquestion_verify/${randomQuestion.id}/${securityAnswer}`;
    const axiosConfig = {
      method: "get",
      url: api,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.access_token}`
      }
    };
    axios(axiosConfig)
      .then(response => {
        if (response.status === 200) {
          if (response.data.hasErrors) {
            setHasErrors(true);
            setErrorMessage(response.data.errors[0].message);
          } else {
            sessionStorage.setItem("securityQuestionAnswered", true);
            setSecurityQuestionAnswered(true);
            window.location.pathname = "/overview";
          }
        } else {
          throw new Error(`Error Code ${response.status}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputChange = event => {
    setSecurityAnswer(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    checkSecurityQuestionAnswer();
  };

  useMountEffect(() => {
    fetchSecurityQuestionsLibrary();
  });

  if (securityQuestionAnswered) {
    return props.securedComponent;
  } else {
    if (loading) {
      return <Loading isLoading={loading} />;
    } else {
      return (
        <Fragment>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={2} />
            <Grid item xs={12} lg={8}>
              <Box mt={6}>
                <Paper square={true}>
                  <Typography
                    className="moduleTitle"
                    variant="h6"
                    component="h1"
                    gutterBottom
                  >
                    <div className={classes.moduleTitle}>Authenticate</div>
                  </Typography>
                  <form className="moduleContent" onSubmit={onSubmit}>
                    <TextField
                      id="securityAnswer"
                      name="securityAnswer"
                      label={randomQuestion.copy}
                      value={securityAnswer}
                      onChange={handleInputChange}
                      margin="dense"
                      variant="outlined"
                      error={hasErrors}
                      className="ajaxLabel"
                      fullWidth
                      required
                    />
                    {hasErrors ? (
                      <div>
                        <small className="error">{errorMessage}</small>
                      </div>
                    ) : (
                      <div />
                    )}
                    <Typography variant="body2" component="small" gutterBottom>
                      Answers are case sensitive.
                    </Typography>
                    <Box mt={2}>
                      <input
                        className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
                        type="submit"
                        value="Submit"
                      />
                    </Box>
                  </form>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} />
          </Grid>
        </Fragment>
      );
    }
  }
}

const useStyles = makeStyles(theme => ({
  moduleTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light
  }
}));
