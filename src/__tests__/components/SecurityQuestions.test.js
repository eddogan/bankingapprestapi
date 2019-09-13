import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import SecurityQuestions from "../../components/SecurityQuestions";

sessionStorage.setItem("access_token", null);

it("renders correctly", () => {
  const tree = renderer.create(<SecurityQuestions />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SecurityQuestions />, div);
  ReactDOM.unmountComponentAtNode(div);
});
