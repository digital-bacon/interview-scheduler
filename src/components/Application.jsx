import React from "react";

import {
	getAppointmentsForDay,
	getInterviewersForDay,
	getInterview,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";

const Application = (props) => {
	const { state, setDay, bookInterview, cancelInterview } =
		useApplicationData();

	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const interviewers = getInterviewersForDay(state, state.day);

	const appointments = dailyAppointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		return (
			<Appointment
				key={appointment.id}
				{...appointment}
				interview={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
	});

	return (
		<main className="layout" data-testid="main">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={state.days} value={state.day} onChange={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{appointments}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
};

export default Application;
