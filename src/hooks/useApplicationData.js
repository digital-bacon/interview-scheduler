import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

import {
	countAvailableInterviewSpotsForDay,
	getDayNameByAppointmentId,
	getDayByName,
} from "../helpers/selectors";

/**
 * React hook to manage application data and state
 * @returns {Object} Object
 * @property {Object} state - the current state
 * @property {Function} setDay - called when the currently selected day is
 * changed to update the current state
 * @property {Function} bookInterview - called to apply interview changes to the
 * state and api
 * @property {Function} cancelInterview - called when an interview is cancelled
 * or deleted
 */
const useApplicationData = () => {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});
	const socket = useRef(null);
	const newInterviewRef = useRef(null);

	/**
	 * Selects and creates a copy of the day object that matches the provided day
	 * name in the data provided. Then updates the available interview spots for
	 * the day and returns an array of all days from data along with the updated
	 * day.
	 * @param {Object} data - the data object from which to find the day
	 * @param {String} dayName - the day name to match. Case sensitive. Only weekdays
	 * @returns {Array} array [objects from state by reference]. The current day
	 * object is replaced with the updated day object created by this function
	 */
	const getDaysAndCurrentSpots = useCallback((data, dayName) => {
		const dayObj = getDayByName(data, dayName);
		const spots = countAvailableInterviewSpotsForDay(data, dayName);
		const newDay = { ...dayObj, spots };
		const newDays = data.days.map((day) =>
			day.name === dayName ? { ...newDay } : day
		);
		return newDays;
	}, []);

	/**
	 * Receives new interview data for an appointment slot and updates state to
	 * match
	 * @param {Number} appointmentId - the appointment id that is to receive the
	 * interview change
	 * @param {Object|null} interview - will update the current interview
	 * data for this appointment to match. When provided a null value, the current
	 * interview for this appointment will be removed
	 */
	const setInterviewState = useCallback(
		(appointmentId, interview = null) => {
			const appointment = { ...state.appointments[appointmentId] };
			appointment.interview = interview;

			const appointments = { ...state.appointments };
			appointments[appointmentId] = appointment;

			const newState = { ...state, appointments };

			const dayName = getDayNameByAppointmentId(newState, appointmentId);

			const days = getDaysAndCurrentSpots(newState, dayName);

			const objectEquality = (object1, object2) => {
				return JSON.stringify(object1) === JSON.stringify(object2);
			};

			const statesAreUnchanged = objectEquality(state, newState);
			if (statesAreUnchanged) {
				return;
			}

			setState({ ...newState, days });
		},
		[setState, getDaysAndCurrentSpots, state]
	);

	/**
	 * Update state to the current day
	 * @param {String} dayName - the day name to set. Case sensitive. Only
	 * weekday names
	 */
	const setDay = (dayName) => setState((prev) => ({ ...prev, day: dayName }));

	/**
	 * Controls interview assignment and removal in appointment slots by calling
	 * an update to the app state and then sending an update to the api
	 * @param {Number} appointmentId - the appointment id that is to receive the
	 * interview change
	 * @param {Object|null} interview - will update the current interview
	 * data for this appointment to match. When provided a null value, the current
	 * interview for this appointment slot will be deleted
	 * @returns {Object} a promise from the api request
	 */
	const bookInterview = (appointmentId, interview = null) => {
		setInterviewState(appointmentId, interview);

		const appointment = { ...state.appointments[appointmentId] };
		appointment.interview = interview;

		if (interview) {
			return axios.put(`/api/appointments/${appointmentId}`, {
				...appointment,
			});
		}

		return axios.delete(`/api/appointments/${appointmentId}`);
	};

	/**
	 * Called when an interview is to be cancelled (deleted)
	 * @param {Number} appointmentId - the appointment id that is to receive the
	 * interview change
	 * @returns {Object} a promise from the api delete request
	 */
	const cancelInterview = (appointmentId) => bookInterview(appointmentId, null);

	/**
	 * React hook that will run once only, after the Application component is
	 * mounted for the first time
	 */
	useEffect(() => {
		const apis = {
			days: "api/days",
			appointments: "api/appointments",
			interviewers: "api/interviewers",
		};

		Promise.all([
			Promise.resolve(axios.get(apis.days)),
			Promise.resolve(axios.get(apis.appointments)),
			Promise.resolve(axios.get(apis.interviewers)),
		])
			.then((all) => {
				const days = all[0].data;
				const appointments = all[1].data;
				const interviewers = all[2].data;
				setState((prev) => ({ ...prev, days, appointments, interviewers }));
			})
			.catch((error) => console.log(error.message));
	}, []);

	useEffect(() => {
		socket.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
		const socketCurrent = socket.current;
		socket.current.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (typeof data === "object" && data.type === "SET_INTERVIEW") {
				const appointmentId = data.id;
				const interviewObject = data.interview;
				setInterviewState(appointmentId, interviewObject);
			}
		};

		return () => {
			if (socketCurrent.readyState === 1) {
				socketCurrent.close();
			}
		};
	}, [setInterviewState]);

	return {
		newInterviewRef,
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
};

export default useApplicationData;
