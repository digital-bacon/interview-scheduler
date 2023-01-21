import React from "react";
import PropTypes from "prop-types";

import Button from "components/Button";

const Confirm = ({
	message, // string: message to display to user
	onConfirm, // func: onClick callback for confirm <Button>
	onCancel, // func: onClick callback for cancel <Button>
	...props
}) => {
	return (
		<main className="appointment__card appointment__card--confirm">
			<h1 className="text--semi-bold">{message}</h1>
			<section className="appointment__actions">
				<Button onClick={onCancel} danger>
					Cancel
				</Button>
				<Button onClick={onConfirm} danger>
					Confirm
				</Button>
			</section>
		</main>
	);
};

Confirm.propTypes = {
	message: PropTypes.string.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
};

export default Confirm;
