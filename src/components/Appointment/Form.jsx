import React from "react";
import PropTypes from "prop-types";

import useFormData from "hooks/useFormData";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = ({
	interviewer: interviewerId, // number: id of the interviewer in this appointment
	interviewers, // array.isRequired: list of available interviewers
	onCancel, // func.isRequired: onClick callback for cancel <Button>
	onSave, // func.isRequired: onClick callback for save <Button>
	student: studentName, // string: name of the student
	...props
}) => {
	const initialValues = {
		name: studentName || "",
		interviewer: interviewerId || null,
	};

	const validationData = {
		name: {
			required: true,
			requiredError: "Student name cannot be blank",
		},
		interviewer: {
			required: true,
			requiredError: "Please select an interviewer",
		},
	};

	const { formData, handleSubmit, cancel, validate, onChange, error } =
		useFormData(initialValues, validationData, onSave, onCancel);

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={handleSubmit}>
					<input
						className="appointment__create-input text--semi-bold"
						value={formData.name}
						type="text"
						placeholder="Enter Student Name"
						data-testid="student-name-input"
						name="name"
						onChange={onChange}
					/>
				</form>
				<section className="appointment__validation">{error}</section>
				<InterviewerList
					interviewers={interviewers}
					value={formData.interviewer}
					onChange={onChange}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
};

Form.propTypes = {
	interviewer: PropTypes.number,
	interviewers: PropTypes.array.isRequired,
	onCancel: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	student: PropTypes.string,
};

export default Form;
