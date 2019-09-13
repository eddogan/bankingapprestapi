import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import ExternalBankInfoForm from "../../components/ExternalBankInfoForm";

it("renders correctly", () => {
  const tree = renderer.create(<ExternalBankInfoForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExternalBankInfoForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
