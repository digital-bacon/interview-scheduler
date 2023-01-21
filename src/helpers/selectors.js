/**
 * Finds a single day object from provided data
 * @param {Object} data - the data object from which to find the day
 * @param {String} dayName - the day name to match. Case sensitive. Only weekday
 * names
 * @returns {Object} matched day from data as an object
 */
export const getDayByName = (data, dayName) => {
	const dayFromData = data?.days.find((day) => day.name === dayName) || {};
	return dayFromData;
};

/**
 * Selects a single interview object from provided data
 * @param {Object} data - the data object from which to find the interview
 * @param {Object|null} [interview] - when provided, should contain an object
 * with property 'interviewer' containing the id number of the interviewer. The
 * id is used to select data from data.interviewers
 * @returns {Object|null} a combined object with the provided interview object
 * and the matched data. If no interview object was provided, it returns null.
 */
export const getInterview = (data, interview) => {
	if (!interview) {
		return null;
	}

	const interviewerId = interview.interviewer;
	const interviewerData = data?.interviewers[interviewerId] || {};
	const interviewFromData = {
		...interview,
		interviewer: { ...interviewerData },
	};
	return interviewFromData;
};

/**
 * Selects all appointments for the given day from provided data
 * @param {Object} data - the data object from which to select the appointments
 * @param {String} dayName - the day name to match. Case sensitive. Only weekday
 * names
 * @returns {Array} matched appointments from data as objects in an array
 */
export const getAppointmentsForDay = (data, dayName) => {
	const dayFromData = getDayByName(data, dayName);
	const appointmentsFromDay =
		dayFromData.appointments?.map((id) => data.appointments[id]) || [];
	return appointmentsFromDay;
};

/**
 * Finds a single day object from provided data and returns the interviewers
 * array from that day
 * @param {Object} data - the data object from which to select the day
 * @param {String} dayName - the day name to match. Case sensitive. Only weekday
 * names
 * @returns {Array} an array of interviewer ids for the matched day
 */
export const getDays = (data) => {
	const days = data.days?.map((day) => day) || [];
	return days;
};

/**
 * Finds a single day object from provided data and returns the interviewers
 * array from that day
 * @param {Object} data - the data object from which to select the day
 * @param {String} dayName - the day name to match. Case sensitive. Only weekday
 * names
 * @returns {Array} an array of interviewer ids for the matched day
 */
export const getInterviewerIdsForDay = (data, dayName) => {
	const dayFromData = getDayByName(data, dayName);
	const interviewerIdsFromDay = dayFromData.interviewers || [];
	return interviewerIdsFromDay;
};

/**
 * Selects all interviewers for the given day from provided data
 * @param {Object} data - the data object from which to select the interviewers
 * @param {String} dayName - the day name to match. Case sensitive. Only weekday
 * names
 * @returns {Array} matched interviewers from data as objects in an array
 */
export const getInterviewersForDay = (data, dayName) => {
	const interviewerIdsFromDay = getInterviewerIdsForDay(data, dayName);
	const interviewersFromDay =
		interviewerIdsFromDay?.map((id) => data.interviewers[id]) || [];
	return interviewersFromDay;
};

/**
 * Counts the available interview spots for a given day from provided data
 * @param {Object} data - the data object from which to select the day
 * @param {String} dayName - the day name to match. Case sensitive. Only weekday
 * names
 * @returns {Number} the total available interview slots for the given day
 */
export const countAvailableInterviewSpotsForDay = (data, dayName) => {
	const appointmentsForDay = getAppointmentsForDay(data, dayName);
	const totalSpotsForDay =
		appointmentsForDay?.filter((appointment) => appointment.interview === null)
			.length || 0;
	return totalSpotsForDay;
};
