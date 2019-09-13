import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import AccountSummary from "../../components/AccountSummary";

it("renders correctly", () => {
  const tree = renderer.create(<AccountSummary />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AccountSummary />, div);
  ReactDOM.unmountComponentAtNode(div);
});
