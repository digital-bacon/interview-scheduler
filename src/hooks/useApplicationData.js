import { useEffect, useState } from 'react';

import axios from 'axios';

import selectors from '../helpers/selectors';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({...prev, day}));

  const updateSpots = (state) => {
    const dayObj = state.days.find(day => day.name === state.day);
    const spots = selectors.countSpotsForDay(state, state.day);
    const newDay = { ...dayObj, spots };
    const newDays = state.days.map(day => day.name === state.day ? { ...newDay } : day);
    return newDays;
  }

  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id] };
    appointment.interview = interview;

    const appointments = { ...state.appointments };
    appointments[id] = appointment;

    const newState = { ...state, appointments };

    const days = updateSpots(newState);

    setState({ ...newState, days })

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