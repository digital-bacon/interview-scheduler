import { useEffect, useState } from "react";
import axios from "axios";
import { countAvailableInterviewSpotsForDay } from "../helpers/selectors";

/**
 * React hook to manage application data and state
 * @returns {Object} Object
 * @property {Object} state - the current state
 * @property {Function} setDay - called when the currently selected day is changed to update the current state
 * @property {Function} bookInterview - called to apply interview changes to the state and api
 * @property {Function} cancelInterview - called when an interview is cancelled/deleted
 */
const useApplicationData = () => {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	/**
	 * Update state to the current day
	 * @param {String} day - the day name to set. Case sensitive. Only weekday names
	 */
	const setDay = (day) => setState((prev) => ({ ...prev, day }));

	/**
	 * Creates a copy of the the current day object from state and updates the available interview
	 * spots in the copy. Returns an array with the updated day object, and all other days from state
	 * @param {Object} state - the current state object
	 * @returns {Object} newDays object
	 * @property {Array} [day] - an Array containing day objects from state, by reference. The current
	 * day object is replaced with the updated day object created by this function
	 */
	const updateSpots = (state) => {
		const dayObj = state.days.find((day) => day.name === state.day);
		const spots = countAvailableInterviewSpotsForDay(state, state.day);
		const newDay = { ...dayObj, spots };
		const newDays = state.days.map((day) =>
			day.name === state.day ? { ...newDay } : day
		);
		return newDays;
	};

	/**
	 * Controls interview assignment and removal in appointment slots by updating the
	 * app state and api to reflect any change requested
	 * @param {Number} id - the appointment id that is to receive the interview change
	 * @param {Object|null} interview - will update the current interview data for this
	 * appointment to match. When provided a null value, the current interview for this
	 * appointment slot will be deleted
	 * @returns {Object} a promise from the api request
	 */
	const bookInterview = (id, interview) => {
		const appointment = { ...state.appointments[id] };
		appointment.interview = interview;

		const appointments = { ...state.appointments };
		appointments[id] = appointment;

		const newState = { ...state, appointments };

		const days = updateSpots(newState);

		setState({ ...newState, days });

		if (interview) {
			return axios.put(`/api/appointments/${id}`, { ...appointment });
		}

		return axios.delete(`/api/appointments/${id}`);
	};

	/**
	 * Called when an interview is to be cancelled (deleted)
	 * @param {Number} id - the appointment id that is to receive the interview change
	 * @returns {Object} a promise from the api delete request
	 */
	const cancelInterview = (id) => bookInterview(id, null);

	/**
	 * React hook that will run once only, after the Application component is mounted for the first time
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

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
};

export default useApplicationData;
