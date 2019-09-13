import React, { useState, Fragment, useContext } from "react";
// Material-UI imports
import {
  Paper,
  Typography,
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Material-UI icon imports
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { BrandingContext } from "../Branding";

export default function FaqAccordion(props) {
  const brand = useContext(BrandingContext);
  const faqList = require(`./FaqLists/faq.${brand.brandingIdentifier}.json`);
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = Object.entries(faqList).map(function(faq, row) {
    const panelKey = "panel" + faq[1].id;
    const paragraphs = faq[1].descriptions.map(function(text, i) {
      return <p key={i}>{text.text}</p>;
    });
    let lists = [];
    if (faq[1].listItems) {
      lists = faq[1].listItems.map(function(text, i) {
        return <p key={i}>{text.text}</p>;
      });
    } else {
      lists = null;
    }
    return (
      <Box key={row} py={1} className="flex alignItemsCenter">
        <ExpansionPanel
          expanded={expanded === panelKey}
          onChange={handleChange(panelKey)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant="h6" component="h4">
              {faq[1].title}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component="div">
              {paragraphs}
              {lists}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>
    );
  });

  return (
    <Fragment>
      <Box my={6}>
        <Paper square={true}>
          <Typography
            className="moduleTitle"
            variant="h6"
            component="h1"
            gutterBottom
          >
            <div className={classes.moduleTitle}>
              Frequently Asked Questions
            </div>
          </Typography>
          <div className="moduleContent">{faqs}</div>
        </Paper>
      </Box>
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  moduleTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light
  }
}));
