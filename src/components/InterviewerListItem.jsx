import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

const InterviewerListItem = ({
	id,
	name,
	avatar,
	selected: isSelected,
	setInterviewer,
	...props
}) => {
	const classLibrary = {
		li: {
			interviewers__item: true,
			"interviewers__item--selected": isSelected,
		},

		img: {
			"interviewers__item-image": true,
		},
	};

	const classLi = classNames(classLibrary.li);
	const classImg = classNames(classLibrary.img);

	return (
		<li className={classLi}>
			<img
				className={classImg}
				src={avatar}
				alt={name}
				data-name="interviewer"
				data-value={id}
				data-type="number"
				data-source="element"
				onClick={setInterviewer}
			/>
			{isSelected && name}
		</li>
	);
};

InterviewerListItem.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	avatar: PropTypes.string,
	selected: PropTypes.bool.isRequired,
	setInterviewer: PropTypes.func.isRequired,
};

export default InterviewerListItem;
