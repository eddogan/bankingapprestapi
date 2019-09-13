import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import PersonalInfoForm from "../../components/PersonalInfoForm";

it("renders correctly", () => {
  const tree = renderer.create(<PersonalInfoForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PersonalInfoForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
