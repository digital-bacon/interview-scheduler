import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

const InterviewerList = ({
	interviewers: interviewersArray, // array: copy of state.interviewers
	value: currentInterviewerId, // number: id of currently interviewer
	onChange, // func: callback to execute when an interviewer is clicked
	...props
}) => {
	const interviewers = interviewersArray.map((interviewer) => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={currentInterviewerId === interviewer.id ? true : false}
				id={interviewer.id}
				setInterviewer={onChange}
			/>
		);
	});

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list" data-testid="interviewers-list">
				{interviewers}
			</ul>
		</section>
	);
};

InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
	value: PropTypes.number,
	onChange: PropTypes.func.isRequired,
};

export default InterviewerList;
