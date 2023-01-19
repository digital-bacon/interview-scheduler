import React from "react";
import ReactDOM from "react-dom";

import Application from "components/Application";

import "index.scss";

// ReactDOM.render(<Application />, document.getElementById("root"));

const renderToDOM = () => {
  const target = document.getElementById("root");
  if (target !== null) {
      ReactDOM.render(<Application />, target)
  }
}
renderToDOM();

export default renderToDOM;
