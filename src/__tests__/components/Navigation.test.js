import React from "react";
import ReactDOM from "react-dom";
import Navigation from "../../components/Navigation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Navigation disabled={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Navigation disabled={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
