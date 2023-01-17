import { useEffect, useState } from "react";

import axios from 'axios';

// import selectors from '../helpers/selectors';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({...prev, day}));

  const updateSpots = (state, appointments) => {
    const dayObj = state.days.find(day => day.name === state.day);
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    };

    const day = { ...dayObj, spots };
    const newDays = state.days.map(d => d.name === state.day ? { ...day } : d);
    return newDays;
  }

  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id] };
    appointment.interview = interview;

    const appointments = { ...state.appointments };
    appointments[id] = appointment;

    const days = updateSpots(state, appointments);

    setState({ ...state, days, appointments})

    if (interview) {
      return axios.put(`/api/appointments/${id}`, { ...appointment });
    }

    return axios.delete(`/api/appointments/${id}`);

  }

  const cancelInterview = (id) => bookInterview(id, null);

  useEffect(() => {
    const apis = {
      days: 'api/days',
      appointments: 'api/appointments',
      interviewers: 'api/interviewers'
    };

    Promise.all([
      Promise.resolve(axios.get(apis.days)),
      Promise.resolve(axios.get(apis.appointments)),
      Promise.resolve(axios.get(apis.interviewers))
    ])
    .then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    })
    .catch(error => console.log(error.message));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
   };
};

export default useApplicationData;