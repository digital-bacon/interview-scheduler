export const getAppointmentsForDay = (state, day) => {
  const dayFromState = state.days.filter(dayData => dayData.name === day)[0] || [];
  const filteredAppointments = dayFromState.appointments?.map(id => state.appointments[id]) || [];
  return filteredAppointments;
}