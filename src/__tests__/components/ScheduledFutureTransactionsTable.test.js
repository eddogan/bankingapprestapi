import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import ScheduledFutureTransactionsTable from "../../components/ScheduledFutureTransactionsTable";

const filteredData = [];

it("renders correctly", () => {
  const tree = renderer
    .create(<ScheduledFutureTransactionsTable data={filteredData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ScheduledFutureTransactionsTable data={filteredData} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
