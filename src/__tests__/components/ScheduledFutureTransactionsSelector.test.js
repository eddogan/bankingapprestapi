import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import ScheduledFutureTransactionsSelector from "../../components/ScheduledFutureTransactionsSelector";

it("renders correctly", () => {
  const tree = renderer
    .create(<ScheduledFutureTransactionsSelector />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ScheduledFutureTransactionsSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
