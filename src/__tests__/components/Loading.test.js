import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Loading from "../../components/Loading";

it("renders correctly", () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Loading />, div);
  ReactDOM.unmountComponentAtNode(div);
});
