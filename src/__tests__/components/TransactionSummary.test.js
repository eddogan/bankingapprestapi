import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import TransactionSummary from "../../components/TransactionSummary";

it("renders correctly", () => {
  const tree = renderer.create(<TransactionSummary />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TransactionSummary />, div);
  ReactDOM.unmountComponentAtNode(div);
});
