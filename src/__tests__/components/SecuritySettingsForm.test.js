import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import SecuritySettingsForm from "../../components/SecuritySettingsForm";

it("renders correctly", () => {
  const tree = renderer.create(<SecuritySettingsForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SecuritySettingsForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
