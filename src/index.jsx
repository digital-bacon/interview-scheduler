import React from "react";
import ReactDOM from "react-dom";

import Application from "components/Application";

import "index.scss";

const renderToDOM = () => {
	const target = document.getElementById("root");
	if (target !== null) {
		ReactDOM.render(<Application />, target);
	}
};
renderToDOM();

export default renderToDOM;
