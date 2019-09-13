import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Welcome from "../../components/Welcome";

it("renders correctly", () => {
  const tree = renderer.create(<Welcome />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Welcome />, div);
  ReactDOM.unmountComponentAtNode(div);
});
