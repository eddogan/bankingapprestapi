import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import CompletedTransactionsTable from "../../components/CompletedTransactionsTable";

const filteredData = [];

it("renders correctly", () => {
  const tree = renderer
    .create(<CompletedTransactionsTable data={filteredData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CompletedTransactionsTable data={filteredData} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
