const getUniqueArrayValues = fromArray => [...new Set(fromArray)];

const getInterviewerById = (data, interviewerId) => {
  const interviewersFromData = Object.values(data.interviewers);
  const interviewer = interviewersFromData.find(interviewer => interviewer.id === interviewerId) || {};
  return interviewer;
}

const getInterview = (data, interview) => {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewerData = data.interviewers[interviewerId] || {};
  const interviewFromData = { ...interview , interviewer: { ...interviewerData } }
  return interviewFromData;
}

const getDayByName = (data, dayName) => {
  const dayFromData = data.days.find(dayData => dayData.name === dayName) || [];
  return dayFromData;
}

const getAppointmentsForDay = (data, dayName) => {
  const dayFromData = getDayByName(data, dayName);
  const appointmentsFromDay = dayFromData.appointments?.map(id => data.appointments[id]) || [];
  return appointmentsFromDay;
}

const getInterviewsForDay = (data, dayName) => {
  const appointmentsFromDay = getAppointmentsForDay(data, dayName);
  const interviewsFromDay = appointmentsFromDay.filter(appointment => appointment.interview !== null);
  return interviewsFromDay;
}

const getInterviewerIdsForDay = (data, dayName) => {
  const interviewsFromDay = getInterviewsForDay(data, dayName);
  const interviewerIdsFromInterviews = interviewsFromDay.map(appointment => appointment.interview.interviewer);
  const uniqueInterviewerIdsFromInterviews = getUniqueArrayValues(interviewerIdsFromInterviews);
  return uniqueInterviewerIdsFromInterviews;
}

const getInterviewersForDay = (data, dayName) => {
  const interviewerIdsFromDay = getInterviewerIdsForDay(data, dayName);
  const interviewersFromDay = interviewerIdsFromDay.map(id => getInterviewerById(data, id));
  return interviewersFromDay;
}

export {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
}