const getDay = (data, dayName) => {
  const dayFromData = data.days.find(dayData => dayData.name === dayName) || [];
  return dayFromData;
}

const getAppointmentsForDay = (data, dayName) => {
  const dayFromData = getDay(data, dayName);
  const appointmentsFromData = dayFromData.appointments?.map(id => data.appointments[id]) || [];
  return appointmentsFromData;
}

export {
  getDay,
  getAppointmentsForDay
}