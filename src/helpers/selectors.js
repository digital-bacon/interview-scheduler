const getDay = (data, dayName) => {
  const dayFromData = data.days.find(dayData => dayData.name === dayName) || [];
  return dayFromData;
}

const getAppointmentsForDay = (data, dayName) => {
  const dayFromData = getDay(data, dayName);
  const appointmentsFromData = dayFromData.appointments?.map(id => data.appointments[id]) || [];
  return appointmentsFromData;
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

export {
  getDay,
  getAppointmentsForDay,
  getInterview
}