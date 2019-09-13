import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Header from "../../components/Header";

const brandingConfig = JSON.stringify({
  brandName: "Global Client Solutions",
  logoFilePath: "images/logo.png",
  email: "customersupport@ghtulsa.com",
  phoneNumber: "1-800-398-7191",
  address1: "4343 S. 118th E. Ave., Suite 220",
  address2: "",
  brandShortName: "GCS",
  brandWebsiteUrl: "https://www.globalclientsolutions.com/",
  brandingIdentifier: "globalclientsolutions",
  city: "Tulsa",
  color1: "0685C7",
  color2: "1FB2F2",
  color3: "142936",
  color4: "CFCFD1",
  errors: [],
  hasErrors: false,
  hasWarnings: false,
  secondAddress: "PO Box 690870 Tulsa, OK. 74169-0870",
  secondBrandName: "Global Client Solutions LLC",
  state: "Ok",
  zipcode: "74146"
});

sessionStorage.setItem("brandingConfig", brandingConfig);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Suspense fallback={<div>loading...</div>}>
      <Header />
    </Suspense>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
