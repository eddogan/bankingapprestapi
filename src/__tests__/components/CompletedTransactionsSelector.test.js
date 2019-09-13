import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import CompletedTransactionsSelector from "../../components/CompletedTransactionsSelector";

it("renders correctly", () => {
  const tree = renderer.create(<CompletedTransactionsSelector />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CompletedTransactionsSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
