import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "components/Button.scss";

const Button = ({
	confirm: isConfirm, // bool: is a confirm button
	danger: isDanger, // bool: is a danger button
	disabled: isDisabled, // bool: is a disabled button
	onClick, // func.isRequired: onClick callback
	...props
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
