import React, { Fragment, useState, useEffect, useCallback } from "react";
import axios from "axios";
// Material-UI imports
import {
  Typography,
  Box,
  TextField,
  Button,
  OutlinedInput,
  FormControl,
  Select,
  InputLabel
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
// Custom imports
import getApi from "../../helpers/GetApi";

export default function ChangeSecurityQuestionsForm() {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [clientQuestions, setClientQuestions] = useState({
    question1: "",
    question2: "",
    question3: "",
    answer1: "",
    answer2: "",
    answer3: ""
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const fetchAllQuestions = useCallback(async () => {
    const securityQuestionsEndpoint = `${process.env.REACT_APP_API_URL}/useraccess/securityquestions`;
    const securityQuestionsResponse = await axios(
      getApi(securityQuestionsEndpoint)
    );
    const questions = Object.entries(securityQuestionsResponse.data).map(
      function(value, i) {
        return (
          <option key={i} value={value[0]}>
            {value[1]}
          </option>
        );
      }
    );
    setQuestions(questions);
  }, []);

  const fetchClientQuestions = useCallback(async () => {
    const securityQuestionsAnswersEndpoint = `${process.env.REACT_APP_API_URL}/useraccess/securityquestions_answers`;
    const securityQuestionsAnswersResponse = await axios(
      getApi(securityQuestionsAnswersEndpoint)
    );
    setClientQuestions({
      ...securityQuestionsAnswersResponse.data,
      question1: Object.entries(securityQuestionsAnswersResponse.data)[0][0],
      question2: Object.entries(securityQuestionsAnswersResponse.data)[1][0],
      question3: Object.entries(securityQuestionsAnswersResponse.data)[2][0],
      answer1: Object.entries(securityQuestionsAnswersResponse.data)[0][1],
      answer2: Object.entries(securityQuestionsAnswersResponse.data)[1][1],
      answer3: Object.entries(securityQuestionsAnswersResponse.data)[2][1]
    });
  }, []);

  useEffect(() => {
    fetchAllQuestions();
    fetchClientQuestions();
  }, [fetchAllQuestions, fetchClientQuestions]);

  const onSubmit = event => {
    event.preventDefault();
  };

  const handleChange = name => event => {
    setClientQuestions({
      ...clientQuestions,
      [name]: event.target.value
    });
  };

  return (
    <Fragment>
      <Box px={2} pb={2}>
        <Typography
          className={classes.moduleSubTitle}
          variant="h6"
          component="h1"
        >
          Manage security questions
        </Typography>
      </Box>
      <form onSubmit={onSubmit}>
        <FormControl className={classes.formControl} margin="normal">
          <InputLabel
            ref={inputLabel}
            htmlFor="question1NativeSimple"
            shrink={true}
            className="ajaxLabel"
          >
            Question #1
          </InputLabel>
          <Select
            native
            value={clientQuestions.question1}
            onChange={handleChange("question1")}
            input={
              <OutlinedInput
                name="question1"
                labelWidth={labelWidth}
                id="question1NativeSimple"
              />
            }
          >
            {questions}
          </Select>
        </FormControl>
        <Box px={2} pb={2}>
          <TextField
            id="answerOne"
            name="answerOne"
            label="Enter your answer for the first question"
            variant="outlined"
            margin="normal"
            helperText="Answers are case sensitive."
            fullWidth={true}
            value={clientQuestions.answer1}
            className="ajaxLabel"
            onChange={handleChange("answer1")}
          />
        </Box>
        <FormControl className={classes.formControl} margin="normal">
          <InputLabel
            ref={inputLabel}
            htmlFor="question2NativeSimple"
            shrink={true}
            className="ajaxLabel"
          >
            Question #2
          </InputLabel>
          <Select
            native
            value={clientQuestions.question2}
            onChange={handleChange("question2")}
            input={
              <OutlinedInput
                name="question2"
                labelWidth={labelWidth}
                id="question2NativeSimple"
              />
            }
          >
            {questions}
          </Select>
        </FormControl>
        <Box px={2} pb={2}>
          <TextField
            id="answerTwo"
            name="answerTwo"
            label="Enter your answer for the second question"
            variant="outlined"
            margin="normal"
            helperText="Answers are case sensitive."
            fullWidth={true}
            value={clientQuestions.answer2}
            className="ajaxLabel"
            onChange={handleChange("answer2")}
          />
        </Box>
        <FormControl className={classes.formControl} margin="normal">
          <InputLabel
            ref={inputLabel}
            htmlFor="question3NativeSimple"
            shrink={true}
            className="ajaxLabel"
          >
            Question #3
          </InputLabel>
          <Select
            native
            value={clientQuestions.question3}
            onChange={handleChange("question3")}
            input={
              <OutlinedInput
                name="question3"
                labelWidth={labelWidth}
                id="question3NativeSimple"
              />
            }
          >
            {questions}
          </Select>
        </FormControl>
        <Box px={2}>
          <TextField
            id="answerThree"
            name="answerThree"
            label="Enter your answer for the third question"
            variant="outlined"
            margin="normal"
            helperText="Answers are case sensitive."
            fullWidth={true}
            value={clientQuestions.answer3}
            className="ajaxLabel"
            onChange={handleChange("answer3")}
          />
        </Box>
        <Box m={2} className={classes.aligncenter}>
          <Button variant="contained" color="primary" type="submit">
            Update security questions
          </Button>
        </Box>
      </form>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  moduleSubTitle: {
    borderBottom: "1px dashed #eee"
  },
  formControl: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    "& label": {
      left: 24,
      top: "-8px",
      backgroundColor: "#fff",
      zIndex: 10,
      padding: "0 8px"
    }
  }
}));
