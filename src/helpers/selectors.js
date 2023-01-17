const selectors = {
  getInterview(data, interview) {
    if (!interview) {
      return null;
    }
  
    const interviewerId = interview.interviewer;
    const interviewerData = data?.interviewers[interviewerId] || {};
    const interviewFromData = { ...interview , interviewer: { ...interviewerData } }
    return interviewFromData;
  },
  
  getDayByName(data, dayName) {
    const dayFromData = data?.days.find(day => day.name === dayName) || {};
    return dayFromData;
  },

  getDayByAppointmentId(data, appointmentId) {
    const matchingAppointmentIds = (day) => day?.appointments.find(appointment => appointment === appointmentId);
    const dayFromAppointmentId = data?.days?.find(day => matchingAppointmentIds(day)) || {};
    return dayFromAppointmentId;
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
  
  countSpotsForDay(data, dayName) {
    const appointmentsForDay = this.getAppointmentsForDay(data, dayName);
    const totalSpotsForDay = appointmentsForDay?.filter(appointment => appointment.interview === null).length || 0;
    return totalSpotsForDay;
  },
};

export default selectors;