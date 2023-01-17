const selectors = {
  getInterview(data, interview) {
    if (!interview) {
      return null;
    }
  
    const interviewerId = interview.interviewer;
    const interviewerData = data.interviewers[interviewerId] || {};
    const interviewFromData = { ...interview , interviewer: { ...interviewerData } }
    return interviewFromData;
  },
  
  getDayByName(data, dayName) {
    const dayFromData = data.days.find(dayData => dayData.name === dayName) || [];
    return dayFromData;
  },
  
  getAppointmentsForDay(data, dayName) {
    const dayFromData = this.getDayByName(data, dayName);
    const appointmentsFromDay = dayFromData.appointments?.map(id => data.appointments[id]) || [];
    return appointmentsFromDay;
  },
  
  getInterviewerIdsForDay(data, dayName) {
    const dayFromData = this.getDayByName(data, dayName);
    const interviewerIdsFromDay = dayFromData.interviewers;
    return interviewerIdsFromDay;
  },
  
  getInterviewersForDay(data, dayName) {
    const interviewerIdsFromDay = this.getInterviewerIdsForDay(data, dayName);
    const interviewersFromDay = interviewerIdsFromDay?.map(id => data.interviewers[id]) || [];
    return interviewersFromDay;
  },
};

export default selectors;