import React from "react";
import ReactDOM from "react-dom";
import { NewUserModal } from "../../components/Modals";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NewUserModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
