import React from "react";
import PropTypes from "prop-types";

const Show = ({
	student: studentName,
	interviewer: interviewerName,
	onEdit,
	onDelete,
	...props
}) => {
	return (
		<main className="appointment__card appointment__card--show">
			<section className="appointment__card-left">
				<h2 className="text--regular">{studentName}</h2>
				<section className="interviewer">
					<h4 className="text--light">Interviewer</h4>
					<h3 className="text--regular">{interviewerName}</h3>
				</section>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<img
						className="appointment__actions-button"
						onClick={onEdit}
						src="images/edit.png"
						alt="Edit"
						data-testid="show-button-edit"
					/>
					<img
						className="appointment__actions-button"
						onClick={onDelete}
						src="images/trash.png"
						alt="Delete"
						data-testid="show-button-trash"
					/>
				</section>
			</section>
		</main>
	);
};

Show.propTypes = {
	student: PropTypes.string.isRequired,
	interviewer: PropTypes.string.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default Show;
