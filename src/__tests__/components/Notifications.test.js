import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Notifications from "../../components/Notifications";

it("renders correctly", () => {
  const tree = renderer.create(<Notifications />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Notifications />, div);
  ReactDOM.unmountComponentAtNode(div);
});
