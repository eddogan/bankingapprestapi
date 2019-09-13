import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import FaqAccordion from "../../components/FaqAccordion";

const brand = "globalclientsolutions";

it("renders correctly", () => {
  const tree = renderer.create(<FaqAccordion brand={brand} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FaqAccordion brand={brand} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
