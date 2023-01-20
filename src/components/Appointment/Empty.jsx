import React from "react";
import PropTypes from "prop-types";

const Empty = ({ onAdd, ...props }) => {
	return (
		<main className="appointment__add">
			<img
				className="appointment__add-button"
				onClick={onAdd}
				src="images/add.png"
				alt="Add"
				data-testid="appointment-add-button"
			/>
		</main>
	);
};

Empty.propTypes = {
	onAdd: PropTypes.func.isRequired,
};

export default Empty;
