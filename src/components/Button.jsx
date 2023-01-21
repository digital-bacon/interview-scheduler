import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "components/Button.scss";

const Button = ({
	confirm: isConfirm, // Boolean: when true, will apply class "button--confirm"
	danger: isDanger, // Boolean: when true, will apply class "button--danger"
	disabled: isDisabled, // Boolean: when true, applies attribute "disabled"
	onClick, // Function: callback to execute when button is clicked
	...props // Any: all other props not documented here
}) => {
	const classLibrary = {
		button: true,
		"button--confirm": isConfirm,
		"button--danger": isDanger,
	};

	const buttonClass = classNames(classLibrary);

	return (
		<button className={buttonClass} onClick={onClick} disabled={isDisabled}>
			{props.children}
		</button>
	);
};

Button.propTypes = {
	confirmed: PropTypes.bool,
	danger: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default Button;
